import AffirmationMessage from "@/components/affirmations/affirmation-message";
import HomeHeader from "@/components/home/home-header";
import DisplayCard from "@/components/shared/display-card";
import { affirmations } from "@/data/mock";
import { getPartnerConnections } from "@/helpers/partner-connection-helper";
import { useAuth } from "@/provider/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setConnectionDisplays, setPartnerConnections } from "@/state/slices/patner-connection-slice";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isAuthenticated, user } = useAuth();

  const dispatch = useAppDispatch();
  const { connectionDisplays} = useAppSelector((state) => state.partnerConnection.value);

  const todaysAffirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  useEffect(() => {
    // const getAffirmation = async () => {
    //   if (isAuthenticated) {
    //     // Get the user's daily affirmations
    //     // TODO: I could do this in the backend on day change
    //     if (
    //       !todaysAffirmation ||
    //       new Date(todaysAffirmation.date).getDay() !== new Date().getDay()
    //     ) {
    //       dispatch(
    //         setTodaysAffirmation(await getTodaysAffirmation(user?.uid ?? "")),
    //       );
    //     }
    //   }
    // };

    const getPartners = async () => {
      if (
        isAuthenticated &&
        (!connectionDisplays || connectionDisplays.length <= 0)
      ) {
        const { connections, displays } = await getPartnerConnections(
          user!.uid,
        );
        dispatch(setPartnerConnections(connections));
        dispatch(setConnectionDisplays(displays));
      }
    };

    // getAffirmation();
    getPartners();
  }, [user, isAuthenticated, todaysAffirmation, dispatch, connectionDisplays]);

  return (
    <>
      <SafeAreaView style={safeAreaStyle.safeArea}>
        <HomeHeader />
        <DisplayCard>
          {}
          <AffirmationMessage
            affirmation={todaysAffirmation}
            hasForword={todaysAffirmation !== undefined}
          />
        </DisplayCard>
      </SafeAreaView>
    </>
  );
}