import AffirmationCard from "@/components/affirmations/affirmation-card";
import HomeHeader from "@/components/home/home-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView style={safeAreaStyle.safeArea}>
        <HomeHeader />
        <AffirmationCard/>
      </SafeAreaView>
    </>
  );
}
