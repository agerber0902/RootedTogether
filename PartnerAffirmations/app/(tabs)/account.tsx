import AccountHeader from "@/components/account/account-header";
import AccountInfoView from "@/components/account/account-info-view";
import PartnerInfoCard from "@/components/account/partner/partner-info-card";
import LoginModal from "@/components/modals/login-modal";
import SharedCard from "@/components/shared/shared-card";
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
              <SharedCard
                cardContainerStyle={accountInfoStyles.infoCardContainer}
                cardContentStyle={accountInfoStyles.infoCardContent}
                visible={true}
              >
                <AccountInfoView />
              </SharedCard>

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
