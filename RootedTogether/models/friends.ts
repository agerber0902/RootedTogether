import { Timestamp } from "firebase/firestore";

export type FriendIds = [string, string];

export interface InvitedFriend {
  id?: string;
  friendIds: FriendIds;
  createdById: string;
  createdAt?: Timestamp;
  friendDetails: FriendUserDetail[];
  isAccepted: boolean;
}

export interface FriendUserDetail {
  userId: string;
  displayName: string;
}

export interface FriendDisplay {
  invitedFriendId: string;
  friendName: string;
  friendId: string;
  friendDisplayName: string;
  createdAt: Timestamp;
  isAccepted: boolean;
}

export type CreateInvitedFriend = Omit<
  InvitedFriend,
  "id" | "createdAt"
>;
export type UpdateInvitedFriend = Partial<CreateInvitedFriend> &
  Pick<InvitedFriend, "id">;

export const invitedFriendMap = (
  data: any,
  id: string,
): InvitedFriend => {
  const friendDetails = (
    data.friendDetails ??
    data.participantDetails ??
    []
  ).map(
    (detail: any): FriendUserDetail => ({
      userId: detail.userId,
      displayName: detail.displayName,
    }),
  );

  return {
    id,
    friendIds: data.friendIds,
    createdById: data.createdById,
    createdAt: data.createdAt?.toMillis?.() ?? data.createdAt,
    friendDetails,
    isAccepted: data.isAccepted ?? false
  };
};
