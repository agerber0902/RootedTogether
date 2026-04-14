import { View } from "react-native";
import HeaderView from "../shared/header-view";
import SignOutButton from "./sign-out-button";
import { accountHeaderStyle } from "@/style/stylesheets/account/account-header-style";
import FadeInView from "../shared/fade-in-view";
import { animationStyle } from "@/style/stylesheets/components/shared/animation-style";

const AccountHeader = () => {
  return (
    <View style={accountHeaderStyle.container}>
      <View style={accountHeaderStyle.headerContainer}>
        <HeaderView title="Account Information" />
      </View>
      <View style={accountHeaderStyle.actionContainer}>
        <FadeInView
          visible={true}
          delay={animationStyle.delay.headerDelay}
          duration={animationStyle.duration.headerDuration}
        >
          <SignOutButton />
        </FadeInView>
      </View>
    </View>
  );
};
export default AccountHeader;
