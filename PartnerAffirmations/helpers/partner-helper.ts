import { PartnerConnection, partnerConnectionMap } from "@/constants/models/partnerConnection";
import { addData, deleteData, updateData } from "./firebase-helper";
import { getUserByEmail } from "./user-helper";
import { AffirmationUser } from "@/constants/models/user";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/config/firebase";

const collectionName = "partnerConnections";

export const getPartnerConnections = async (userId: string): Promise<PartnerConnection[]> => {
  const ref = collection(firestore, collectionName);

  const userCreatedQuery = query(
    ref,
    where("connectionCreatorId", "==", userId),
  );

  const otherConnections = query(ref, where("partnerId", "==", userId));

  const userCreatedSnapshot = await getDocs(userCreatedQuery);
  const otherConnectionSnapshot = await getDocs(otherConnections);

  if (userCreatedSnapshot.empty && otherConnectionSnapshot.empty) {
    return [];
  }

  let connections: PartnerConnection[] = [];
  if(!userCreatedSnapshot.empty){
    connections = [...userCreatedSnapshot.docs.map((doc) => {
      const data = doc.data();
      return partnerConnectionMap(data, doc.id);
    })];
  }
  if(!otherConnectionSnapshot.empty){
    connections = [...otherConnectionSnapshot.docs.map((doc) => {
      const data = doc.data();
      return partnerConnectionMap(data, doc.id);
    })];
  }

  return connections;
};

export const deletePartnerConnection = async (id: string) => {
  await deleteData(collectionName, id);
};
export const editPartnerConnection = async (partnerConnection: PartnerConnection) => {
  const connection: PartnerConnection = {...partnerConnection};
  await updateData<PartnerConnection>(collectionName, connection);
};

export const addPartnerConnection = async (
  user: AffirmationUser,
  email: string,
  displayName: string,
) => {
  // Verify the user with that email exists
  const userConnection = await getUserByEmail(email);

  if (!userConnection) {
    return;
  }

  await createPartnerConnection(
    user.uid,
    user.name,
    userConnection.id!,
    displayName,
  );
};

const createPartnerConnection = async (
  userId: string,
  userDisplayName: string,
  connectionUserId: string,
  connectionUserDisplayName: string,
): Promise<void> => {
  const partnerConnection: PartnerConnection = {
    connectionCreatorId: userId,
    connectionCreatorDisplayName: userDisplayName,
    partnerId: connectionUserId,
    partnerDisplayName: connectionUserDisplayName,
  };
  await addData<PartnerConnection>(collectionName, partnerConnection);
  return;
};
