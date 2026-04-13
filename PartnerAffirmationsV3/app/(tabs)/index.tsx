import AffirmationMessage from "@/components/affirmations/affirmation-message";
import HomeHeader from "@/components/home/home-header";
import DisplayCard from "@/components/shared/display-card";
import { useAppSelector } from "@/state/hooks";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { todaysAffirmation } = useAppSelector((state) => state.affirmation.value);

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