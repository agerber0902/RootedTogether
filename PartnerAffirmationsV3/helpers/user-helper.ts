import { User as FirebaseUser } from "firebase/auth";
import { User as AffirmationUser } from "../models/user";
import { addData, updateData } from "./firebase-helper";

const collectionName = "users";

// Add the user to the database for querying
export const addUser = async (user: FirebaseUser) => {
  const parts = (user.displayName ?? "").trim().split(/\s+/);

  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  const first =
    parts.length > 1 ? parts.slice(0, -1).join(" ") : (parts[0] ?? "");

  await addData<AffirmationUser>(collectionName, {
    id: undefined,
    uid: user.uid,
    name: user.displayName ?? "",
    email: user.email ?? "",
    first: first,
    last: last,
  });
};

export const updateUser = async (user: AffirmationUser) => {
  await updateData<AffirmationUser>(collectionName, user);
//   return await getUser(user.uid);
};