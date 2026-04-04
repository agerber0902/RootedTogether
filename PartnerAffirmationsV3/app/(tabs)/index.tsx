import HomeHeader from "@/components/home/home-header";
import DisplayCard from "@/components/shared/display-card";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView style={safeAreaStyle.safeArea}>
        <HomeHeader />
        <DisplayCard>
          <Text />
        </DisplayCard>
      </SafeAreaView>
    </>
  );
}
