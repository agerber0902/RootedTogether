import { getUser } from "@/helpers/user-helper";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setUser } from "@/state/slices/user";
import { useEffect } from "react";

const UserBootStrap = () => {
  const { user } = useAuth();
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrapUser = async () => {
      if (!user) return;

      if (!affirmationUser) {
        const dbUser = await getUser(user.uid);

        if (dbUser) {
          dispatch(setUser(dbUser));
          // TODO: set partners
        }
      }
    };

    bootstrapUser();
  }, [user, affirmationUser, dispatch]);

  return <></>;
};
export default UserBootStrap;
