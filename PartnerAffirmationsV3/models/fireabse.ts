import { User } from "firebase/auth";

export type FirebaseResponse = {
  firebaseUser: User | null;
  error: string | undefined;
};