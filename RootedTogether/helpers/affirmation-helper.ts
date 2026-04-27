import { addData, deleteData, updateData } from "./firebase-helper";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import {
  Affirmation,
  affirmationMap,
  TodaysAffirmation,
} from "@/models/affirmation";
import { FriendDisplay } from "@/models/friends";

const collectionName = "affirmations";

export const addAffirmation = async (affirmation: Affirmation) => {
  await addData<Affirmation>(collectionName, affirmation);
};
export const deleteAffirmation = async (affirmationId: string) => {
  await deleteData(collectionName, affirmationId);
};
export const editAffirmation = async (affirmation: Affirmation) => {
  await updateData<Affirmation>(collectionName, affirmation);
};

export const getDefaultAffirmations = async (): Promise<Affirmation[]> => {
  const affirmationRef = collection(firestore, "defaultAffirmations");

  const affirmationsQuery = query(
    affirmationRef
  );

  const snapshot = await getDocs(affirmationsQuery);

  if (snapshot.empty) {
    return [];
  }

  const defaultAffirmations: Affirmation[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return affirmationMap(data, doc.id);
  });

  return defaultAffirmations;
};

// Helper function to get affirmation for a creator
const getAffirmationForCreator = (
  creatorId: string,
  allAffirmations: Affirmation[],
): Affirmation[] | undefined => {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
  );

  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  );

  // Filter affirmations by creator
  const creatorAffirmations = allAffirmations.filter(
    (a) => a.creatorId === creatorId,
  );

  if (creatorAffirmations.length === 0) {
    return undefined;
  }

  // Try to get today's affirmations
  const todaysAffirmations = creatorAffirmations.filter((a) => {
    if (!a.displayDate) return false;
    const d = new Date(a.displayDate.toDate());
    return d >= startOfDay && d <= endOfDay;
  });

  if (todaysAffirmations.length > 0) {
    return todaysAffirmations;
  }

  // Fallback to random affirmation
  return [getRandomItem(creatorAffirmations)];
};

export const getUserCreatedAffirmations = async (
  creatorId: string,
): Promise<Affirmation[]> => {
  const affirmationRef = collection(firestore, collectionName);

  const affirmationsQuery = query(
    affirmationRef,
    where("creatorId", "==", creatorId),
    orderBy("createdAt", "desc"),
    orderBy("displayDate", "desc"),
  );

  const snapshot = await getDocs(affirmationsQuery);

  if (snapshot.empty) {
    return [];
  }

  const userCreatorAffirmations: Affirmation[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return affirmationMap(data, doc.id);
  });

  return userCreatorAffirmations;
};

export const getTodaysAffirmations = async (
  userId: string,
  friendDisplays: FriendDisplay[],
): Promise<TodaysAffirmation[]> => {
  const affirmationsRef = collection(firestore, collectionName);

  // Get all affirmations by recipientId
  const userAffirmationsQuery = query(
    affirmationsRef,
    where("recipientId", "==", userId),
  );
  const snapshot = await getDocs(userAffirmationsQuery);

  if (snapshot.empty) {
    return [];
  }

  const allAffirmations: Affirmation[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return affirmationMap(data, doc.id);
  });

  const result: TodaysAffirmation[] = [];

  // Add user's affirmations first
  const userAffirmation = getAffirmationForCreator(userId, allAffirmations);
  if (userAffirmation) {
    result.push({
      date: Timestamp.fromDate(new Date()),
      friendDisplayName: "You",
      affirmation: userAffirmation,
    });
  }

  // Add each friend's affirmations
  for (const friendDisplay of friendDisplays) {
    const friendAffirmation = getAffirmationForCreator(
      friendDisplay.friendId,
      allAffirmations,
    );
    if (friendAffirmation) {
      result.push({
        date: Timestamp.fromDate(new Date()),
        friendDisplayName: friendDisplay.friendDisplayName,
        affirmation: friendAffirmation,
      });
    }
  }

  return result;
};

export const getRandomItem = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getLocalDayKey = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};
