import { useAuth } from "@/providers/auth-provider";
import AffirmationCard from "@/components/affirmations/affirmation-card";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getTodaysAffirmation } from "@/helpers/affirmation-helper";
import { setTodaysAffirmation } from "@/state/slices/affirmation";
import SharedSafeView from "@/components/shared/shared-safe-view";
import WelcomeMessage from "@/components/home/welcome-message";
import LoginModal from "@/components/modals/login-modal";
import {
  setDisplayConnections,
  setPartnerConnections,
} from "@/state/slices/partner-connection";
import { getPartnerConnections } from "@/helpers/partner-helper";

const App = () => {
  const { user, isAuthenticated } = useAuth();

  const dispatch = useAppDispatch();
  const { todaysAffirmation } = useAppSelector(
    (state) => state.affirmation.value,
  );
  const { displayConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );

  useEffect(() => {
    const getAffirmation = async () => {
      if (isAuthenticated) {
        // Get the user's daily affirmations
        // TODO: I could do this in the backend on day change
        if (
          !todaysAffirmation ||
          new Date(todaysAffirmation.date).getDay() !== new Date().getDay()
        ) {
          dispatch(
            setTodaysAffirmation(await getTodaysAffirmation(user?.uid ?? "")),
          );
        }
      }
    };

    const getPartners = async () => {
      if (
        isAuthenticated &&
        (!displayConnections || displayConnections.length <= 0)
      ) {
        const { connections, displays } = await getPartnerConnections(
          user!.uid,
        );
        dispatch(setPartnerConnections(connections));
        dispatch(setDisplayConnections(displays));
      }
    };

    getAffirmation();
    getPartners();
  }, [user, isAuthenticated, todaysAffirmation, dispatch, displayConnections]);

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
