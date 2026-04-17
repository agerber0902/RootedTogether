import LoadingSpinner from "@/components/shared/loading-spinner";
import {
  getLocalDayKey,
  getTodaysAffirmations,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import { getFriends } from "@/helpers/friends-helper";
import { getUser } from "@/helpers/user-helper";
import { useAuth } from "@/provider/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  resetTodaysAffirmation,
  resetUserCreatedAffirmations,
  setTodaysAffirmation,
  setUserCreatedAffirmations,
} from "@/state/slices/affirmation-slice";
import { resetfriends, setFriendDisplays, setFriends } from "@/state/slices/friend-slice";
import { setUser } from "@/state/slices/user-slice";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AppState, StyleSheet, View } from "react-native";

type AppBootstrapProps = {
  children: ReactNode;
};

const AppBootstrap = ({ children }: AppBootstrapProps) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { friendDisplays } = useAppSelector((state) => state.friend.value);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [dailyRefreshToken, setDailyRefreshToken] = useState(0);
  const hasCompletedInitialBootstrapRef = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        setDailyRefreshToken((current) => current + 1);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      if (!user) {
        dispatch(setUser(undefined));
        dispatch(resetfriends());
        dispatch(resetUserCreatedAffirmations());
        dispatch(resetTodaysAffirmation());

        if (isActive) {
          hasCompletedInitialBootstrapRef.current = true;
          setIsBootstrapping(false);
        }

        return;
      }

      if (isActive) {
        setIsBootstrapping(true);
      }

      const dayKey = getLocalDayKey();
      const [dbUser, affirmations, friendResult] =
        await Promise.all([
          getUser(user.uid),
          getUserCreatedAffirmations(user.uid),
          getFriends(user.uid),
        ]);

      // Get Today's Affirmations after all the user data is loaded to properly set friend value
      const todaysAffirmations = await getTodaysAffirmations(user.uid, friendResult.displays);

      if (!isActive) {
        return;
      }

      dispatch(setUser(dbUser));
      dispatch(setUserCreatedAffirmations(affirmations));
      dispatch(
        setTodaysAffirmation({
          affirmations: todaysAffirmations,
          dayKey,
        }),
      );
      dispatch(setFriends(friendResult.friends));
      dispatch(setFriendDisplays(friendResult.displays));

      hasCompletedInitialBootstrapRef.current = true;
      setIsBootstrapping(false);
    };

    bootstrap();

    return () => {
      isActive = false;
    };
  }, [user, dispatch]);

  useEffect(() => {
    let isActive = true;

    const refreshTodaysAffirmations = async () => {
      if (!user || !hasCompletedInitialBootstrapRef.current) {
        return;
      }

      const dayKey = getLocalDayKey();
      const todaysAffirmations = await getTodaysAffirmations(user.uid, friendDisplays);

      if (!isActive) {
        return;
      }

      dispatch(
        setTodaysAffirmation({
          affirmations: todaysAffirmations,
          dayKey,
        }),
      );
    };

    refreshTodaysAffirmations();

    return () => {
      isActive = false;
    };
  }, [user, dailyRefreshToken, friendDisplays, dispatch]);

  if (isBootstrapping) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner viewStyle={styles.spinnerContainer} />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    padding: 0,
  },
});

export default AppBootstrap;
