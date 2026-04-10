import { User as FirebaseUser } from "firebase/auth";
import {
  AffirmationUser,
  AffirmationUserMap,
  CreateAffirmationUser,
  UpdateAffirmationUser,
} from "../models/user";
import { addData, updateData } from "./firebase-helper";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "@/config/firebase";

const collectionName = "users";

export const getUser = async (
  uid: string,
): Promise<AffirmationUser | undefined> => {
  const ref = collection(firestore, collectionName);
  const userQuery = query(ref, where("uid", "==", uid), limit(1));
  const snapshot = await getDocs(userQuery);

  if (snapshot.empty) {
    return undefined;
  }

  return AffirmationUserMap(snapshot.docs[0].data(), snapshot.docs[0].id);
};

// Add the user to the database for querying
export const addUser = async (user: FirebaseUser) => {
  const parts = (user.displayName ?? "").trim().split(/\s+/);

  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  const first =
    parts.length > 1 ? parts.slice(0, -1).join(" ") : (parts[0] ?? "");

  const newUser: CreateAffirmationUser = {
    uid: user.uid,
    name: user.displayName ?? "",
    email: user.email ?? "",
    first: first,
    last: last,
  };

  await addData<CreateAffirmationUser>(collectionName, newUser);
};

export const updateUser = async (user: AffirmationUser) => {
  await updateData<UpdateAffirmationUser>(collectionName, user);
  return await getUser(user.uid);
};
