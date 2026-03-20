import { accountInfoStyles } from "@/constants/stylesheets/components/account/account-info-styles";
import AccountInfoView from "./account-info-view";
import React from "react";
import { ScrollView } from "react-native";
import PartnerInfoView from "./partner/partner-info-view";

const AccountInfoCard = () => {
  return (
    <>
      <ScrollView
        style={accountInfoStyles.infoCardContainer}
        contentContainerStyle={accountInfoStyles.infoCardContent}
        showsVerticalScrollIndicator={false}
      >
          <AccountInfoView />
          <PartnerInfoView />
      </ScrollView>
    </>
  );
};
export default AccountInfoCard;
