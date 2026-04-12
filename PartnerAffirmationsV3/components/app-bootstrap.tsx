import {
  getLocalDayKey,
  getTodaysAffirmation,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import { getPartnerConnections } from "@/helpers/partner-connection-helper";
import { getUser } from "@/helpers/user-helper";
import { useAuth } from "@/provider/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  resetTodaysAffirmation,
  resetUserCreatedAffirmations,
  setTodaysAffirmation,
  setUserCreatedAffirmations,
} from "@/state/slices/affirmation-slice";
import {
  resetPartnerConnections,
  setConnectionDisplays,
  setPartnerConnections,
} from "@/state/slices/patner-connection-slice";
import { setUser } from "@/state/slices/user-slice";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

const AppBootstrap = () => {
  const { user } = useAuth();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { todaysAffirmationDayKey } = useAppSelector(
    (state) => state.affirmation.value,
  );
  const loadedAffirmationsUserIdRef = useRef<string | undefined>(undefined);
  const loadedPartnersUserIdRef = useRef<string | undefined>(undefined);
  const [dailyRefreshToken, setDailyRefreshToken] = useState(0);

  const dispatch = useAppDispatch();

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
    const bootstrapUser = async () => {
      if (!user) {
        dispatch(setUser(undefined));
        loadedPartnersUserIdRef.current = undefined;
        dispatch(resetPartnerConnections());
        loadedAffirmationsUserIdRef.current = undefined;
        dispatch(resetUserCreatedAffirmations());
        dispatch(resetTodaysAffirmation());
        return;
      }

      if (!affirmationUser || affirmationUser.uid !== user.uid) {
        const dbUser = await getUser(user.uid);

        if (dbUser) {
          dispatch(setUser(dbUser));
        }
      }
    };

    bootstrapUser();
  }, [user, affirmationUser, dispatch]);

  useEffect(() => {
    const bootstrapAffirmations = async () => {
      if (!user) {
        loadedAffirmationsUserIdRef.current = undefined;
        dispatch(resetUserCreatedAffirmations());
        return;
      }

      if (loadedAffirmationsUserIdRef.current === user.uid) {
        return;
      }

      const affirmations = await getUserCreatedAffirmations(user.uid);
      loadedAffirmationsUserIdRef.current = user.uid;

      dispatch(setUserCreatedAffirmations(affirmations));
    };

    bootstrapAffirmations();
  }, [user, dispatch]);

  useEffect(() => {
    const bootstrapTodaysAffirmation = async () => {
      if (!user) {
        dispatch(resetTodaysAffirmation());
        return;
      }

      const dayKey = getLocalDayKey();

      if (todaysAffirmationDayKey === dayKey) {
        return;
      }

      const todaysAffirmation = await getTodaysAffirmation(user.uid);

      dispatch(
        setTodaysAffirmation({
          affirmation: todaysAffirmation?.affirmation,
          dayKey,
        }),
      );
    };

    bootstrapTodaysAffirmation();
  }, [user, todaysAffirmationDayKey, dailyRefreshToken, dispatch]);

  useEffect(() => {
    const bootstrapPartners = async () => {
      if (!user) {
        loadedPartnersUserIdRef.current = undefined;
        dispatch(resetPartnerConnections());
        return;
      }

      if (loadedPartnersUserIdRef.current === user.uid) {
        return;
      }

      const { connections, displays } = await getPartnerConnections(user.uid);
      loadedPartnersUserIdRef.current = user.uid;

      dispatch(setPartnerConnections(connections));
      dispatch(setConnectionDisplays(displays));
    };

    bootstrapPartners();
  }, [user, dispatch]);

  return <></>;
};

export default AppBootstrap;