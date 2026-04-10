import type { User } from "firebase/auth";

export interface FirebaseResponse {
  firebaseUser: User | null;
  error?: string;
}
