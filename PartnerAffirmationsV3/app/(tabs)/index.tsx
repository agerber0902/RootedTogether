import AffirmationMessage from "@/components/affirmations/affirmation-message";
import HomeHeader from "@/components/home/home-header";
import DisplayCard from "@/components/shared/display-card";
import { affirmations } from "@/data/mock";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const affirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <>
      <SafeAreaView style={safeAreaStyle.safeArea}>
        <HomeHeader />
        <DisplayCard>
          <AffirmationMessage affirmation={affirmation} hasForword={true} />
        </DisplayCard>
      </SafeAreaView>
    </>
  );
}
