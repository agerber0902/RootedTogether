import { Timestamp } from "firebase/firestore";

export interface Affirmation {
  id?: string;
  message: string;
  displayDate: Timestamp | null;
  recipientId?: string;
  creatorId?: string;

  createdAt: Timestamp;
}

export interface TodaysAffirmation {
  date: Timestamp;
  friendDisplayName: string;
  affirmation: Affirmation[] | undefined;
};

export type CreateAffirmation = Omit<Affirmation, "id" | "createdAt">;
export type UpdateAffirmation = Partial<CreateAffirmation> & Pick<Affirmation, "id">;

export const affirmationMap = (data: any, id: string): Affirmation => {
  return {
    id: id,
    message: data.message,
    displayDate: data.displayDate,
    recipientId: data.recipientId,
    creatorId: data.creatorId,
    createdAt: data.createdAt,
  };
};