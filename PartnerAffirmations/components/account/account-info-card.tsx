import { accountInfoStyles } from "@/constants/stylesheets/components/account/account-info-styles";
import SharedCard from "../shared/shared-card";
import AccountInfoView from "./account-info-view";

const AccountInfoCard = () => {
  return (
    <>
      <SharedCard
        cardContainerStyle={accountInfoStyles.infoCardContainer}
        cardContentStyle={accountInfoStyles.infoCardContent}
        visible={true}
      >
        <AccountInfoView />
      </SharedCard>
    </>
  );
};
export default AccountInfoCard;
