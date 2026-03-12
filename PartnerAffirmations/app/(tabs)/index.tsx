import { useAuth } from "@/providers/auth-provider";
import Header from "@/components/shared/header";
import AffirmationCard from "@/components/affirmations/affirmation-card";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getTodaysAffirmation } from "@/helpers/affirmation-helper";
import { setTodaysAffirmation } from "@/state/slices/affirmation";
import SharedSafeView from "@/components/shared/shared-safe-view";
import WelcomeMessage from "@/components/home/welcome-message";
import LoginModal from "@/components/modals/login-modal";

const App = () => {
  const { user, authLoading, isAuthenticated } = useAuth();

  const dispatch = useAppDispatch();
  const { todaysAffirmation } = useAppSelector(
    (state) => state.affirmation.value,
  );

  useEffect(() => {
    const getAffirmation = async () => {
      if (isAuthenticated) {
        // Get the user's daily affirmations
        // TODO: I could do this in the backend on day change
        if (
          !todaysAffirmation ||
          todaysAffirmation.date.getDay() !== new Date().getDay()
        ) {
          dispatch(
            setTodaysAffirmation(await getTodaysAffirmation(user?.uid ?? "")),
          );
        }
      }
    };

    getAffirmation();
  }, [user, isAuthenticated, todaysAffirmation, dispatch]);

  return (
    <>
      {!isAuthenticated ? (
        <LoginModal />
      ) : (
        <SharedSafeView header={<WelcomeMessage />}>
          <AffirmationCard />
        </SharedSafeView>
      )}
    </>
  );
};
export default App;
