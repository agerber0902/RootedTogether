import { Timestamp } from "firebase/firestore";

export type PartnerConnection = {
    id?: string;
    connectionCreatorId: string;
    connectionCreatorDisplayName: string;
    partnerId: string;
    partnerDisplayName: string;
    createdAt?: Timestamp;
};

export const partnerConnectionMap = (data: any, id: string): PartnerConnection => {
  return {
    id: id,
    connectionCreatorId: data.connectionCreatorId,
    connectionCreatorDisplayName: data.connectionCreatorDisplayName,
    partnerId: data.partnerId,
    partnerDisplayName: data.partnerDisplayName,
    createdAt: data.createdAt

  };
}