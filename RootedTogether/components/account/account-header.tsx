import { View } from "react-native";
import HeaderView from "../shared/header-view";
import SignOutButton from "./sign-out-button";
import { accountHeaderStyle } from "@/style/stylesheets/account/account-header-style";
import FadeInView from "../shared/fade-in-view";
import { animationStyle } from "@/style/stylesheets/components/shared/animation-style";
import DeleteAccountButton from "./delete-account-button";
import { useAuth } from "@/provider/auth-provider";

type AccountHeaderProps = {
  isEditMode: boolean;
  setIsEditMode: (flag: boolean) => void;
}

const AccountHeader = ({isEditMode, setIsEditMode}: AccountHeaderProps) => {
  const { isAuthenticated } = useAuth();
  return (
    <View style={accountHeaderStyle.container}>
      <View style={accountHeaderStyle.headerContainer}>
        <HeaderView title="Account Information" subText=""/>
      </View>
      <View style={accountHeaderStyle.actionContainer}>
        {isAuthenticated && <FadeInView
          visible={true}
          delay={animationStyle.delay.headerDelay}
          duration={animationStyle.duration.headerDuration}
        >
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', gap: 5,}}>
            {!isEditMode ? <SignOutButton /> : <DeleteAccountButton onClick={() => setIsEditMode(false)}/>}
          </View>
        </FadeInView>}
      </View>
    </View>
  );
};
export default AccountHeader;
