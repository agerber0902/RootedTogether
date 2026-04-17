
import { addData, deleteData, updateData } from "./firebase-helper";
import { getUser, getUserByEmail } from "./user-helper";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { FriendDisplay, FriendUserDetail, InvitedFriend, invitedFriendMap } from "@/models/friends";
import { AffirmationUser } from "@/models/user";
import { FirebaseResponse } from "@/models/firebase";
import { hasMatchingStringPair, sortStringPair, validateDistinctStringPair } from "./validation-helper";

const collectionName = "friends";

type FriendOutput = {
  friends: InvitedFriend[];
  displays: FriendDisplay[];
};

const validateFriendIds = (friendIds: [string, string]): string | undefined => {
  return validateDistinctStringPair(friendIds, "Friends");
};

const findDuplicateFriend = async (
  friendIds: [string, string],
  excludeId?: string,
): Promise<InvitedFriend | undefined> => {
  const ref = collection(firestore, collectionName);
  const duplicateQuery = query(ref, where("friendIds", "array-contains", friendIds[0]));
  const snapshot = await getDocs(duplicateQuery);

  const duplicateDoc = snapshot.docs.find((doc) => {
    if (excludeId && doc.id === excludeId) {
      return false;
    }

    const data = doc.data();
    const existingFriendIds = data.friendIds as [string, string] | undefined;
    if (!existingFriendIds || existingFriendIds.length !== 2) {
      return false;
    }

    return hasMatchingStringPair(existingFriendIds, friendIds);
  });

  if (!duplicateDoc) {
    return undefined;
  }

  return invitedFriendMap(duplicateDoc.data(), duplicateDoc.id);
};

export const getFriendId = (
  userId: string,
  friend: InvitedFriend,
): string | undefined => {
  return friend.friendIds.find((p) => p !== userId);
};

export const getFriendInfo = async (
  userId: string,
  invitedFriend: InvitedFriend,
): Promise<FriendDisplay> => {
  const friendId = getFriendId(userId, invitedFriend) ?? "";
  const friend = await getUser(friendId);

  return {
    invitedFriendId: invitedFriend.id ?? "",
    createdAt: invitedFriend.createdAt ?? new Timestamp(0, 0),
    friendId: friendId,
    friendName: friend?.name ?? "",
    friendDisplayName:
      invitedFriend.friendDetails.find((d) => d.userId === friendId)
        ?.displayName ?? "",
  };
};


export const getFriends = async (
  userId: string,
): Promise<FriendOutput> => {
  const ref = collection(firestore, collectionName);

  const friendQuery = query(
    ref,
    where("friendIds", "array-contains", userId),
  );

  const snapshot = await getDocs(friendQuery);

  if (snapshot.empty) {
    return {friends: [], displays: []};
  }

  let friends: InvitedFriend[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return invitedFriendMap(data, doc.id);
  });

  // Get display friends
  const displays = await getFriendsForDisplay(userId, friends)

  return {friends, displays};
};

const getFriendsForDisplay = async (
  userId: string,
  friends: InvitedFriend[],
): Promise<FriendDisplay[]> => {
  try {
    const results = await Promise.all(
      friends.map((c) => getFriendInfo(userId, c)),
    );

    return results;
  } catch {
    return [];
  }
};

export const deleteFriend = async (id: string) : Promise<FirebaseResponse<string>> => {
  return await deleteData(collectionName, id);
};
export const editFriend = async (
  friend: InvitedFriend,
) : Promise<FirebaseResponse<string>> => {
  const friendIdsValidationError = validateFriendIds(friend.friendIds);
  if (friendIdsValidationError) {
    return { data: undefined, error: friendIdsValidationError };
  }

  const duplicateFriend = await findDuplicateFriend(
    friend.friendIds,
    friend.id,
  );

  if (duplicateFriend) {
    return {
      data: undefined,
      error: "That friendahip already exists",
    };
  }

  return await updateData<InvitedFriend>(collectionName, friend);
};

export const addFriend = async (
  user: AffirmationUser,
  email: string,
  displayName: string,
) : Promise<FirebaseResponse<string>>  => {
  // Verify the user with that email exists
  const friendUser = await getUserByEmail(email);

  if (!friendUser) {
    return {data: '', error: 'User does not exist'};
  }

  return await createFriend(
    user.uid,
    user.name,
    friendUser.uid!,
    displayName,
  );
};

const createFriend = async (
  userId: string,
  userDisplayName: string,
  friendUserId: string,
  friendUserDisplayName: string,
): Promise<FirebaseResponse<string>> => {
  const friendIds = sortStringPair([userId, friendUserId]);
  const duplicateFriend = await findDuplicateFriend(friendIds);

  if (duplicateFriend) {
    return {
      data: undefined,
      error: "That friendship already exists",
    };
  }

  const friendDetails: FriendUserDetail[] = [
    { userId: userId, displayName: userDisplayName },
    { userId: friendUserId, displayName: friendUserDisplayName },
  ];

  const invitedFriend: InvitedFriend = {
    createdById: userId,
    friendIds: friendIds,
    friendDetails: friendDetails,
  };
  return await addData<InvitedFriend>(collectionName, invitedFriend);
};