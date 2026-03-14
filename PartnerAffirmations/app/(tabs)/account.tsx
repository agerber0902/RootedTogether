import AccountHeader from "@/components/account/account-header";
import AccountInfoCard from "@/components/account/account-info-card";
import PartnerInfoCard from "@/components/account/partner/partner-info-card";
import LoginModal from "@/components/modals/login-modal";
import SharedSafeView from "@/components/shared/shared-safe-view";
import { accountInfoStyles } from "@/constants/stylesheets/components/account/account-info-styles";
import { useAuth } from "@/providers/auth-provider";
import { View } from "react-native";

const AccountScreen = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <LoginModal />
      ) : (
        <SharedSafeView header={<AccountHeader />}>
          <>
            <View style={accountInfoStyles.mainContainer}>
              {/* Account Info Card */}
              <AccountInfoCard />

              {/* Partner Info Card */}
              <PartnerInfoCard />
            </View>
          </>
        </SharedSafeView>
      )}
    </>
  );
};
export default AccountScreen;
