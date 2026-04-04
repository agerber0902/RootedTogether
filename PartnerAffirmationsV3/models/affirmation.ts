import { Timestamp } from "firebase/firestore";

export type Affirmation = {
  id?: string;
  message: string;
  displayDate?: Timestamp | undefined;
  recipientId: string;
  creatorId: string;

  createdAt: Timestamp;
};