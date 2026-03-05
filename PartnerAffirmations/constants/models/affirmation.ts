export type Affirmation = {
  id?: string;
  message: string;
  displayDate: Date | null;
  recipientId: string;
  creatorId: string;
}

export type TodaysAffirmation = {
  date: Date;
  affirmation: Affirmation | undefined;
};

export const affirmationMap = (data: any, id: string): Affirmation => {
  return {
    id: id,
    message: data.message,
    displayDate: data.displayDate,
    recipientId: data.recipientId,
    creatorId: data.creatorId,
  };
}
