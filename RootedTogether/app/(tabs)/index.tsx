import AffirmationCard from "@/components/affirmations/affirmation-card";
import HomeHeader from "@/components/home/home-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const safeAreaStyles = safeAreaStyle('home');

  return (
    <>
      <SafeAreaView style={safeAreaStyles.safeArea}>
        <View style={safeAreaStyles.headerContainer}>
          <HomeHeader />
        </View>
        <View style={safeAreaStyles.contentContainer}>
          <AffirmationCard/>
        </View>
      </SafeAreaView>
    </>
  );
}
