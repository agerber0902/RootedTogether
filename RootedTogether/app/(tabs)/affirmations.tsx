import AffirmationHeader from "@/components/affirmations/affirmation-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCreatedAffirmationView from "@/components/affirmations/user-created-affirmation-view";
import { View } from "react-native";

const AffirmationsScreen = () => {
  const safeAreaStyles = safeAreaStyle("affirmation");

  return (
    <>
      <SafeAreaView style={safeAreaStyles.safeArea}>
        <View style={safeAreaStyles.headerContainer}>
          <AffirmationHeader />
        </View>
        <View style={safeAreaStyles.contentContainer}>
          <UserCreatedAffirmationView />
        </View>
      </SafeAreaView>
    </>
  );
};
export default AffirmationsScreen;
