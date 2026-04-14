import type { User } from "firebase/auth";

export interface FirebaseUserResponse {
  firebaseUser: User | null;
  error: string | undefined;
}

export interface FirebaseResponse<T> {
  data: T | undefined;
  error?: string;
}