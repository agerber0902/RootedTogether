import { AffirmationUser, AffirmationUserMap } from "@/constants/models/user";
import { addData, updateData } from "./firebase-helper";
import { User } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "@/config/firebase";

const collectionName = "users";

// Add the user to the database for querying
export const addUser = async (user: User) => {
  const parts = (user.displayName ?? "").trim().split(/\s+/);

  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  const first =
    parts.length > 1 ? parts.slice(0, -1).join(" ") : (parts[0] ?? "");

  await addData<AffirmationUser>(collectionName, {
    id: undefined,
    uid: user.uid,
    name: user.displayName ?? "",
    first: first,
    last: last,
    displayNameForPartner: user.displayName ?? "",
  });
};

export const updateUser = async (user: AffirmationUser) => {
  await updateData<AffirmationUser>(collectionName, user);
  return await getUser(user.uid);
};

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
