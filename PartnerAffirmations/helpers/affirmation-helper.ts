import {
  Affirmation,
  affirmationMap,
  TodaysAffirmation,
} from "@/constants/models/affirmation";
import { addData } from "./firebase-helper";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { getRandomItem } from "./app_helper";

const collectionName = "affirmations";

export const addAffirmation = async (affirmation: Affirmation) => {
  await addData<Affirmation>(collectionName, affirmation);
};

export const getUserCreatedAffirmations = async (creatorId: string): Promise<Affirmation[]> => {
  const affirmationRef = collection(firestore, collectionName);

  const affirmationsQuery = query(
    affirmationRef,
    where("recipientId", "==", creatorId),
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
    (a) =>
      a.displayDate && a.displayDate >= startOfDay && a.displayDate <= endOfDay,
  );

  if(todaysAffirmations && todaysAffirmations.length > 0){
    return {date: new Date(), affirmation: getRandomItem(todaysAffirmations)};
  };

  const otherAffirmations = allAffirmations.filter(
    (a) =>
      todaysAffirmations.length <= 0 || todaysAffirmations.findIndex((t) => t.id === a.id) !== -1
  );

  if(otherAffirmations && otherAffirmations.length > 0){
    return {date: new Date(), affirmation: getRandomItem(otherAffirmations)};
  }

  return undefined;
};
