import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  Dispatch,
  useRef,
} from "react";
import { auth, convertAffirmationCache } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthContext = createContext<{
  user: User | null;
  authLoading: boolean;
  isAuthenticated: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  displayName: string;
  setDisplayName: Dispatch<SetStateAction<string>>;
}>({
  user: null,
  authLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  displayName: "",
  setDisplayName: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const _has_converted = useRef<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setDisplayName(currentUser?.displayName ?? "");

      setAuthLoading(false);
      setIsAuthenticated(currentUser !== null);

      if (currentUser && !_has_converted.current) {
        _has_converted.current = true;

        (async () => {
          try {
            await convertAffirmationCache(currentUser.uid);
          } catch (err) {
            console.error("Failed to convert anon affirmations:", err);
          }
        })();
      }
    });
    return unsubscribe;
  }, [setAuthLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isAuthenticated,
        setUser,
        displayName,
        setDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth state anywhere
export const useAuth = () => useContext(AuthContext);
