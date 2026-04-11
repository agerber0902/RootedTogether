
import { addData, deleteData, updateData } from "./firebase-helper";
import { getUser, getUserByEmail } from "./user-helper";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { PartnerConnection, PartnerConnectionDisplay, partnerConnectionMap, PartnerUserDetail } from "@/models/partner-connection";
import { AffirmationUser } from "@/models/user";
import { FirebaseResponse } from "@/models/firebase";
import { hasMatchingStringPair, sortStringPair, validateDistinctStringPair } from "./validation-helper";

const collectionName = "partnerConnections";

const validatePartnerIds = (partnerIds: [string, string]): string | undefined => {
  return validateDistinctStringPair(partnerIds, "Partner connection");
};

const findDuplicatePartnerConnection = async (
  partnerIds: [string, string],
  excludeId?: string,
): Promise<PartnerConnection | undefined> => {
  const ref = collection(firestore, collectionName);
  const duplicateQuery = query(ref, where("partnerIds", "array-contains", partnerIds[0]));
  const snapshot = await getDocs(duplicateQuery);

  const duplicateDoc = snapshot.docs.find((doc) => {
    if (excludeId && doc.id === excludeId) {
      return false;
    }

    const data = doc.data();
    const existingPartnerIds = data.partnerIds as [string, string] | undefined;
    if (!existingPartnerIds || existingPartnerIds.length !== 2) {
      return false;
    }

    return hasMatchingStringPair(existingPartnerIds, partnerIds);
  });

  if (!duplicateDoc) {
    return undefined;
  }

  return partnerConnectionMap(duplicateDoc.data(), duplicateDoc.id);
};

export const getPartnerId = (
  userId: string,
  connection: PartnerConnection,
): string | undefined => {
  return connection.partnerIds.find((p) => p !== userId);
};

export const getPartnerInfo = async (
  userId: string,
  connection: PartnerConnection,
): Promise<PartnerConnectionDisplay> => {
  const partnerId = getPartnerId(userId, connection) ?? "";
  const partner = await getUser(partnerId);

  return {
    connectionId: connection.id ?? "",
    createdAt: connection.createdAt ?? new Timestamp(0, 0),
    partnerId: partnerId,
    partnerName: partner?.name ?? "",
    partnerDisplayName:
      connection.partnerDetails.find((d) => d.userId === partnerId)
        ?.displayName ?? "",
  };
};

type ConnectionOutput = {
  connections: PartnerConnection[];
  displays: PartnerConnectionDisplay[];
};

export const getPartnerConnections = async (
  userId: string,
): Promise<ConnectionOutput> => {
  const ref = collection(firestore, collectionName);

  const connectionQuery = query(
    ref,
    where("partnerIds", "array-contains", userId),
  );

  const snapshot = await getDocs(connectionQuery);

  if (snapshot.empty) {
    return {connections: [], displays: []};
  }

  let connections: PartnerConnection[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return partnerConnectionMap(data, doc.id);
  });

  // Get display connections
  const displays = await getConnectionsForDisplay(userId, connections)

  return {connections, displays};
};

const getConnectionsForDisplay = async (
  userId: string,
  connections: PartnerConnection[],
): Promise<PartnerConnectionDisplay[]> => {
  try {
    const results = await Promise.all(
      connections.map((c) => getPartnerInfo(userId, c)),
    );

    return results;
  } catch {
    return [];
  }
};

export const deletePartnerConnection = async (id: string) : Promise<FirebaseResponse<string>> => {
  return await deleteData(collectionName, id);
};
export const editPartnerConnection = async (
  partnerConnection: PartnerConnection,
) : Promise<FirebaseResponse<string>> => {
  const partnerIdsValidationError = validatePartnerIds(partnerConnection.partnerIds);
  if (partnerIdsValidationError) {
    return { data: undefined, error: partnerIdsValidationError };
  }

  const duplicateConnection = await findDuplicatePartnerConnection(
    partnerConnection.partnerIds,
    partnerConnection.id,
  );

  if (duplicateConnection) {
    return {
      data: undefined,
      error: "A partner connection already exists",
    };
  }

  return await updateData<PartnerConnection>(collectionName, partnerConnection);
};

export const addPartnerConnection = async (
  user: AffirmationUser,
  email: string,
  displayName: string,
) : Promise<FirebaseResponse<string>>  => {
  // Verify the user with that email exists
  const userConnection = await getUserByEmail(email);

  if (!userConnection) {
    return {data: '', error: 'User does not exist'};
  }

  return await createPartnerConnection(
    user.uid,
    user.name,
    userConnection.uid!,
    displayName,
  );
};

const createPartnerConnection = async (
  userId: string,
  userDisplayName: string,
  connectionUserId: string,
  connectionUserDisplayName: string,
): Promise<FirebaseResponse<string>> => {
  const partnerIds = sortStringPair([userId, connectionUserId]);
  const duplicateConnection = await findDuplicatePartnerConnection(partnerIds);

  if (duplicateConnection) {
    return {
      data: undefined,
      error: "A partner connection already exists",
    };
  }

  const partnerDetails: PartnerUserDetail[] = [
    { userId: userId, displayName: userDisplayName },
    { userId: connectionUserId, displayName: connectionUserDisplayName },
  ];

  const partnerConnection: PartnerConnection = {
    createdById: userId,
    partnerIds: partnerIds,
    partnerDetails: partnerDetails,
  };
  return await addData<PartnerConnection>(collectionName, partnerConnection);
};