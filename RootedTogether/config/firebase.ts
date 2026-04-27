import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, Auth } from "firebase/auth";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";
import { Affirmation } from "@/models/affirmation";
import { getDefaultAffirmations } from "@/helpers/affirmation-helper";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseWebConfig = {
  apiKey: "AIzaSyBYZ1aH1vF6BBL_KMVDycpxLzS--tJsyZU",
  authDomain: "rootedtogether-71850.firebaseapp.com",
  projectId: "rootedtogether-71850",
  storageBucket: "rootedtogether-71850.firebasestorage.app",
  messagingSenderId: "758644832384",
  appId: "1:758644832384:web:50854597a583c431268e65",
  measurementId: "G-6VDFF2LP5K"
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

const DEFAULT_AFFIRMATIONS_STORAGE_KEY = 'DEFAULT_AFFIRMATIONS';
let _daily_affirmation_cache: Affirmation[] | undefined = undefined;

export const getCachedDefaultAffirmations = async (): Promise<Affirmation[]> => {
  // Check memory cache
  if (_daily_affirmation_cache) return _daily_affirmation_cache;

  // Check AsyncStorage
  const stored = await AsyncStorage.getItem(DEFAULT_AFFIRMATIONS_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    _daily_affirmation_cache = parsed;
    return parsed;
  }

  // Get default affirmations
  const fetched = await getDefaultAffirmations();

  // Persist default affirmation
  await AsyncStorage.setItem(DEFAULT_AFFIRMATIONS_STORAGE_KEY, JSON.stringify(fetched));

  _daily_affirmation_cache = fetched;

  return fetched;
};

export { auth };
export const firestore = getFirestore(app);