import AffirmationCard from "@/components/affirmations/affirmation-card";
import HomeHeader from "@/components/home/home-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView style={safeAreaStyle.safeArea}>
        <View style={safeAreaStyle.headerContainer}>
          <HomeHeader />
        </View>
        <View style={safeAreaStyle.contentContainer}>
          <AffirmationCard/>
        </View>
      </SafeAreaView>
    </>
  );
}
