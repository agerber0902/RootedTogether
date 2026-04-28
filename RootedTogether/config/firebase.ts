import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, Auth } from "firebase/auth";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";
import { Affirmation } from "@/models/affirmation";
import {
  addAffirmation,
  getDefaultAffirmations,
} from "@/helpers/affirmation-helper";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseWebConfig = {
  apiKey: "AIzaSyBYZ1aH1vF6BBL_KMVDycpxLzS--tJsyZU",
  authDomain: "rootedtogether-71850.firebaseapp.com",
  projectId: "rootedtogether-71850",
  storageBucket: "rootedtogether-71850.firebasestorage.app",
  messagingSenderId: "758644832384",
  appId: "1:758644832384:web:50854597a583c431268e65",
  measurementId: "G-6VDFF2LP5K",
};

// Initialize Firebase
const app = initializeApp(firebaseWebConfig);

// Initialize services with persistence
let auth: Auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    auth = getAuth(app);
  }
}

const DEFAULT_AFFIRMATIONS_STORAGE_KEY = "DEFAULT_AFFIRMATIONS";
let _default_affirmation_cache: Affirmation[] | undefined = undefined;

export const getCachedDefaultAffirmations = async (): Promise<
  Affirmation[]
> => {
  // Check memory cache
  if (_default_affirmation_cache) return _default_affirmation_cache;

  // Check AsyncStorage
  const stored = await AsyncStorage.getItem(DEFAULT_AFFIRMATIONS_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    _default_affirmation_cache = parsed;
    return parsed;
  }

  // Get default affirmations
  const fetched = await getDefaultAffirmations();

  // Persist default affirmation
  await AsyncStorage.setItem(
    DEFAULT_AFFIRMATIONS_STORAGE_KEY,
    JSON.stringify(fetched),
  );

  _default_affirmation_cache = fetched;

  return fetched;
};

const ANON_AFFIRMATIONS_STORAGE_KEY = "ANON_AFFIRMATIONS";
let _anon_affirmations_cache: Affirmation[] | undefined = undefined;
export const getCachedAnonymousAffirmations = async (): Promise<
  Affirmation[]
> => {
  if (_anon_affirmations_cache) return _anon_affirmations_cache;

  // Check storage
  const stored = await AsyncStorage.getItem(ANON_AFFIRMATIONS_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    _anon_affirmations_cache = parsed;
    return parsed;
  }

  // Return empty
  return [];
};

export const convertAffirmationCache = async (
  userId: string,
): Promise<void> => {
  const cache = await getCachedAnonymousAffirmations();

  await Promise.all(
    cache.map((affirmation) => {
      const affirmationToAdd = {
        ...affirmation,
        creatorId: userId,
        recipientId: userId,
      };
      return addAffirmation(affirmationToAdd);
    }),
  );

  await AsyncStorage.removeItem(ANON_AFFIRMATIONS_STORAGE_KEY);
  _anon_affirmations_cache = undefined;

};

export const saveToCachedAnonymousAffirmations = async (
  affirmation: Affirmation,
): Promise<Affirmation[]> => {
  // Get cache
  const cache = await getCachedAnonymousAffirmations();

  // Add to cache
  const affirmationToAdd = { id: Date.now().toString(), ...affirmation };

  const updatedCache = [...cache, affirmationToAdd];

  _anon_affirmations_cache = updatedCache;

  await AsyncStorage.setItem(
    ANON_AFFIRMATIONS_STORAGE_KEY,
    JSON.stringify(updatedCache),
  );

  return updatedCache;
};

export const updateCachedAnonymousAffirmations = async (
  affirmation: Affirmation,
): Promise<Affirmation[]> => {
  // Get cache
  const cache = await getCachedAnonymousAffirmations();
  // Find Affirmation
  const affirmationToUpdateIndex = cache.findIndex(
    (c) => c.id === affirmation.id,
  );
  if (affirmationToUpdateIndex < 0) {
    return cache;
  }
  const updatedCache = [...cache];
  updatedCache[affirmationToUpdateIndex] = affirmation;

  _anon_affirmations_cache = updatedCache;

  // Save cache
  await AsyncStorage.setItem(
    ANON_AFFIRMATIONS_STORAGE_KEY,
    JSON.stringify(updatedCache),
  );

  return updatedCache;
};

export const deleteCachedAnonymousAffirmation = async (
  affirmation: Affirmation,
): Promise<Affirmation[]> => {
  // Get cache
  const cache = await getCachedAnonymousAffirmations();
  // Find Affirmation
  const newAffirmations = cache.filter((c) => c.id !== affirmation.id);

  const updatedCache = [...newAffirmations];

  _anon_affirmations_cache = updatedCache;

  // Save cache
  await AsyncStorage.setItem(
    ANON_AFFIRMATIONS_STORAGE_KEY,
    JSON.stringify(updatedCache),
  );

  return updatedCache;
};

export { auth };
export const firestore = getFirestore(app);
