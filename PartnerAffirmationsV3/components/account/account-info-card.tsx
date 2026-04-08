import { View } from "react-native";
import PartnerConnectionsView from "../partner-connections/partner-connections-view";
import DisplayCard from "../shared/display-card";
import AccountInfoView from "./account-info-view";
import { accountInfoCardStyle } from "@/style/stylesheets/account/account-info-card-style";

const AccountInfoCard = () => {
  return (
    <>
      <DisplayCard>
        <View style={accountInfoCardStyle.cardContainer}>
          <View style={accountInfoCardStyle.accountInfoContainer}>
            <AccountInfoView />
          </View>
          <View style={accountInfoCardStyle.partnerConnectionsContainer}>
            <PartnerConnectionsView />
          </View>
        </View>
      </DisplayCard>
    </>
  );
};
export default AccountInfoCard;
