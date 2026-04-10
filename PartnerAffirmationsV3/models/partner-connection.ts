import { Timestamp } from "firebase/firestore";

export type PartnerIds = [string, string];

export interface PartnerConnection {
  id?: string;
  partnerIds: PartnerIds;
  createdById: string;
  createdAt?: Timestamp;
  partnerDetails: PartnerUserDetail[];
}

export interface PartnerUserDetail {
  userId: string;
  displayName: string;
}

export interface PartnerConnectionDisplay {
  connectionId: string;
  partnerName: string;
  partnerId: string;
  partnerDisplayName: string;
  createdAt: Timestamp;
}

export type CreatePartnerConnection = Omit<PartnerConnection, "id" | "createdAt">;
export type UpdatePartnerConnection =
  Partial<CreatePartnerConnection> & Pick<PartnerConnection, "id">;