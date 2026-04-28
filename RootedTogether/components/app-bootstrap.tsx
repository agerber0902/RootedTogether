import LoadingSpinner from "@/components/shared/loading-spinner";
import {
  getCachedAnonymousAffirmations,
  getCachedDefaultAffirmations,
} from "@/config/firebase";
import {
  getLocalDayKey,
  getRandomItem,
  getTodaysAffirmations,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import { getFriends, listenToFriends } from "@/helpers/friends-helper";
import { getUser } from "@/helpers/user-helper";
import { TodaysAffirmation } from "@/models/affirmation";
import { useAuth } from "@/provider/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  resetUserCreatedAffirmations,
  setAnonymousUserCreatedAffirmations,
  setDefaultAffirmations,
  setTodaysAffirmation,
  setUserCreatedAffirmations,
} from "@/state/slices/affirmation-slice";
import {
  resetfriends,
  setFriendDisplays,
  setFriends,
} from "@/state/slices/friend-slice";
import { setUser } from "@/state/slices/user-slice";
import { appBootstrapStyle } from "@/style/stylesheets/components/app-bootstrap-style";
import { Timestamp } from "firebase/firestore";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AppState, View } from "react-native";

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
    // Get Default affimrations
    const getCache = async () => {
      dispatch(setDefaultAffirmations(await getCachedDefaultAffirmations()));

      const anonAffirmations = await getCachedAnonymousAffirmations();
      dispatch(setAnonymousUserCreatedAffirmations(anonAffirmations));
    };

    getCache();
  }, [dispatch]);

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
    if (!user?.uid) return;

    const unsubscribe = listenToFriends(user.uid, (data) => {
      dispatch(setFriends(data.friends));
      dispatch(setFriendDisplays(data.displays));
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [user, dispatch]);

  useEffect(() => {
    let isActive = true;

    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const bootstrap = async () => {
      if (!user) {
        dispatch(setUser(undefined));
        dispatch(resetfriends());
        dispatch(resetUserCreatedAffirmations());

        // Get Default affimrations
        const defaultAffirmations = await getCachedDefaultAffirmations();
        dispatch(setDefaultAffirmations(defaultAffirmations));

        // Set Today's Affirmation for anonymous user
        const randomDefaultAffirmation = getRandomItem(defaultAffirmations);
        const todaysAffirmations: TodaysAffirmation[] = [
          {
            date: Timestamp.fromDate(new Date()),
            friendDisplayName: "",
            affirmation: [randomDefaultAffirmation],
          },
        ];
        dispatch(
          setTodaysAffirmation({
            affirmations: todaysAffirmations,
            dayKey: getLocalDayKey(),
          }),
        );

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

      let dbUser = await getUser(user.uid);
      if (!dbUser) {
        // Race condition: auth state can fire before the Firestore user doc is fully written.
        for (let attempt = 0; attempt < 3 && !dbUser; attempt += 1) {
          await wait(300);
          dbUser = await getUser(user.uid);
        }
      }

      const [affirmations, friendResult] = await Promise.all([
        getUserCreatedAffirmations(user.uid),
        getFriends(user.uid),
      ]);

      // Get Today's Affirmations after all the user data is loaded to properly set friend value
      const todaysAffirmations = await getTodaysAffirmations(
        user.uid,
        friendResult.displays,
      );

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
      const todaysAffirmations = await getTodaysAffirmations(
        user.uid,
        friendDisplays,
      );

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
      <View style={appBootstrapStyle.loadingContainer}>
        <LoadingSpinner viewStyle={appBootstrapStyle.spinnerContainer} />
      </View>
    );
  }

  return <>{children}</>;
};

export default AppBootstrap;
