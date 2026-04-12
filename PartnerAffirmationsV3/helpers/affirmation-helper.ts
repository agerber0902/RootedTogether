import { addData, deleteData, updateData } from "./firebase-helper";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { Affirmation, affirmationMap, TodaysAffirmation } from "@/models/affirmation";

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

export const getUserCreatedAffirmations = async (creatorId: string): Promise<Affirmation[]> => {
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

export const getTodaysAffirmation = async (
  userId: string,
): Promise<TodaysAffirmation | undefined> => {
  const affirmationsRef = collection(firestore, collectionName);

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

  // get affirmations with a recipient id of the user uid
  const userAffirmationsQuery = query(
    affirmationsRef,
    where("recipientId", "==", userId),
  );
  const snapshot = await getDocs(userAffirmationsQuery);

  if (snapshot.empty) {
    return undefined;
  }

  const allAffirmations: Affirmation[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return affirmationMap(data, doc.id);
  });

  // filter by date
  const todaysAffirmations = allAffirmations.filter(
    (a) => {
      if (!a.displayDate) return false;
      const d = new Date(a.displayDate.toDate());
      return d >= startOfDay && d <= endOfDay;
    }
  );

  if(todaysAffirmations && todaysAffirmations.length > 0){
    return {date: new Date().toISOString(), affirmation: getRandomItem(todaysAffirmations)};
  };

  const otherAffirmations = allAffirmations.filter(
    (a) =>
      todaysAffirmations.length <= 0 || todaysAffirmations.findIndex((t) => t.id === a.id) !== -1
  );

  if(otherAffirmations && otherAffirmations.length > 0){
    return {date: new Date().toISOString(), affirmation: getRandomItem(otherAffirmations)};
  }

  return undefined;
};

export const getRandomItem = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};