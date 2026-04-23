import { View } from "react-native";
import HeaderView from "../shared/header-view";
import SignOutButton from "./sign-out-button";
import { accountHeaderStyle } from "@/style/stylesheets/account/account-header-style";
import FadeInView from "../shared/fade-in-view";
import { animationStyle } from "@/style/stylesheets/components/shared/animation-style";
import DeleteAccountButton from "./delete-account-button";

type AccountHeaderProps = {
  isEditMode: boolean;
}

const AccountHeader = ({isEditMode}: AccountHeaderProps) => {
  return (
    <View style={accountHeaderStyle.container}>
      <View style={accountHeaderStyle.headerContainer}>
        <HeaderView title="Account Information" subText=""/>
      </View>
      <View style={accountHeaderStyle.actionContainer}>
        <FadeInView
          visible={true}
          delay={animationStyle.delay.headerDelay}
          duration={animationStyle.duration.headerDuration}
        >
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', gap: 5,}}>
            <SignOutButton />
            {isEditMode && <DeleteAccountButton />}
          </View>
        </FadeInView>
      </View>
    </View>
  );
};
export default AccountHeader;
