import { Timestamp } from "firebase/firestore";

export type Affirmation = {
  id?: string;
  message: string;
  displayDate: string | null;
  recipientId: string;
  creatorId: string;
};

export type TodaysAffirmation = {
  date: string;
  affirmation: Affirmation | undefined;
};

export const affirmationMap = (data: any, id: string): Affirmation => {
  let displayDate: string | null = null;

  if (data.displayDate) {
    if (data.displayDate instanceof Timestamp) {
      displayDate = data.displayDate.toDate().toISOString(); // ✅ Firestore Timestamp
    } else {
      displayDate = new Date(data.displayDate).toISOString(); // ✅ fallback (string, etc.)
    }
  }

  return {
    id: id,
    message: data.message,
    displayDate: displayDate,
    recipientId: data.recipientId,
    creatorId: data.creatorId,
  };
};
