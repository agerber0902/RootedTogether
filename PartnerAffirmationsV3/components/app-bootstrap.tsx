import { getUserCreatedAffirmations } from "@/helpers/affirmation-helper";
import { getUser } from "@/helpers/user-helper";
import { useAuth } from "@/provider/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  resetUserCreatedAffirmations,
  setUserCreatedAffirmations,
} from "@/state/slices/affirmation-slice";
import { setUser } from "@/state/slices/user-slice";
import { useEffect, useRef } from "react";

const AppBootstrap = () => {
  const { user } = useAuth();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const loadedAffirmationsUserIdRef = useRef<string | undefined>(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrapUser = async () => {
      if (!user) {
        dispatch(setUser(undefined));
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

  return <></>;
};

export default AppBootstrap;