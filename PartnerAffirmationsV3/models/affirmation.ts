import { Timestamp } from "firebase/firestore";

export interface Affirmation {
  id?: string;
  message: string;
  displayDate?: Timestamp;
  recipientId: string;
  creatorId: string;

  createdAt: Timestamp;
}

export type CreateAffirmation = Omit<Affirmation, "id" | "createdAt">;
export type UpdateAffirmation = Partial<CreateAffirmation> & Pick<Affirmation, "id">;