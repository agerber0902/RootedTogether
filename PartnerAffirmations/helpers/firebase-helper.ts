import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import {
  addDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { addUser } from "./user-helper";

export type FirebaseResponse = {
  user: User | null;
  error: string | undefined;
};

export const addData = async <T extends { id?: string }>(
  collectionName: string,
  data: T,
) => {
  const { id, ...dataToAdd } = data;
  try {
    const docRef = await addDoc(collection(firestore, collectionName), {
      ...dataToAdd,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const deleteData = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log("Error deleting document:", error);
  }
};

export const signOut = async (): Promise<boolean> => {
  auth
    .signOut()
    .then(() => {
      return true;
    })
    .catch((error) => {
      //TODO: handle error
      return false;
    });

  return false;
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
): Promise<FirebaseResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredential.user, { displayName });
    await userCredential.user.reload();

    // Add user to firestore
    await addUser(userCredential.user);

    return { user: userCredential.user, error: undefined };
  } catch (error: any) {
    return { user: null, error: error.message.split(":")[1].trim() };
  }
};

export const signIn = async (
  email: string,
  password: string,
): Promise<FirebaseResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { user: userCredential.user, error: undefined };
  } catch (error: any) {
    return { user: null, error: error.message.split(":")[1].trim() };
  }
};
