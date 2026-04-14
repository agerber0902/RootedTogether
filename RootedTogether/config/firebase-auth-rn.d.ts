declare module "@firebase/auth/dist/rn/index.js" {
  import type { Persistence } from "firebase/auth";

  type ReactNativeAsyncStorageLike = {
    setItem(key: string, value: string): Promise<unknown>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<unknown>;
  };

  export function getReactNativePersistence(
    storage: ReactNativeAsyncStorageLike,
  ): Persistence;
}