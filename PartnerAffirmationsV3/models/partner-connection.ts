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