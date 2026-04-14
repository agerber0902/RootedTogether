import AffirmationHeader from "@/components/affirmations/affirmation-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCreatedAffirmationView from "@/components/affirmations/user-created-affirmation-view";

const AffirmationsScreen = () => {


  return (
    <>
      <SafeAreaView style={safeAreaStyle.safeArea}>
        <AffirmationHeader />
        <UserCreatedAffirmationView />
      </SafeAreaView>
    </>
  );
};
export default AffirmationsScreen;
