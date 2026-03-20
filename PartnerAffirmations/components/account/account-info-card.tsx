import { accountInfoStyles } from "@/constants/stylesheets/components/account/account-info-styles";
import AccountInfoView from "./account-info-view";
import React from "react";
import { View } from "react-native";

const AccountInfoCard = () => {
  return (
    <>
      <View style={accountInfoStyles.infoCardContainer}>
        <View style={accountInfoStyles.infoCardContent}>
          <AccountInfoView />
        </View>
      </View>
    </>
  );
};
export default AccountInfoCard;
