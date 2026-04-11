import { auth, firestore } from "../config/firebase";
import { FirebaseResponse, FirebaseUserResponse } from "@/models/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { addUser } from "./user-helper";

export const addData = async <T extends object>(
  collectionName: string,
  data: T,
) : Promise<FirebaseResponse<string>> => {
  const { id, ...dataToAdd } = data as T & { id?: string };
  try {
    const docRef = await addDoc(collection(firestore, collectionName), {
      ...dataToAdd,
      createdAt: Timestamp.fromDate(new Date()),
    });

    return {data: docRef.id };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateData = async <T extends { id?: string }>(
  collectionName: string,
  data: T,
) : Promise<FirebaseResponse<string>> => {
  const { id, ...dataToUpdate } = data;

  if (!id) {
    return {data: undefined, error: 'User with that email could not be found.'};
  }

  try {
    const docRef = doc(firestore, collectionName, id);

    await updateDoc(docRef, {
      ...dataToUpdate,
      updatedAt: Timestamp.fromDate(new Date()),
    });

    return {data: id};
  } catch {
    return {data: undefined, error: "An unexpected error occured"};
  }
};

export const deleteData = async (collectionName: string, id: string) : Promise<FirebaseResponse<string>> => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);
    return {data: 'deleted'}
  } catch {
    return {data: undefined, error: "An unexpected error occured"}
  }
};

export const signOut = async (): Promise<boolean> => {
  auth
    .signOut()
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });

  return false;
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
): Promise<FirebaseUserResponse> => {
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

    return { firebaseUser: userCredential.user, error: undefined };
  } catch (error: any) {
    return { firebaseUser: null, error: error.message.split(":")[1].trim() };
  }
};

export const signIn = async (
  email: string,
  password: string,
): Promise<FirebaseUserResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { firebaseUser: userCredential.user, error: undefined };
  } catch (error: any) {
    return { firebaseUser: null, error: error.message.split(":")[1].trim() };
  }
};
