import { Timestamp } from "firebase/firestore";

export type PartnerConnection = {
  id?: string;
  partnerIds: [string, string];
  createdById: string;
  createdAt?: Timestamp | undefined;
  partnerDetails: PartnerUserDetail[];
};

export type PartnerUserDetail = {
  userId: string;
  displayName: string;
}

export type PartnerConnectionDisplay = {
  connectionId: string,
  partnerName: string,
  partnerId: string,
  partnerDisplayName: string,
  createdAt: string,
}

export const partnerConnectionMap = (data: any, id: string): PartnerConnection => {
  const partnerDetails = (data.partnerDetails ?? data.participantDetails ?? []).map(
    (detail: any): PartnerUserDetail => ({
      userId: detail.userId,
      displayName: detail.displayName,
    }),
  );

  return {
    id,
    partnerIds: data.partnerIds,
    createdById: data.createdById,
    createdAt: data.createdAt,
    partnerDetails,
  };
}