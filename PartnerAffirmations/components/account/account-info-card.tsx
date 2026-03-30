import { accountInfoStyles } from "@/constants/stylesheets/components/account/account-info-styles";
import AccountInfoView from "./account-info-view";
import React from "react";
import { ScrollView } from "react-native";
import PartnerInfoView from "./partner/partner-info-view";
import FadeInView from "../shared/fade-in-animated-view";
import {
  baseAnimationDelayDuration,
  baseAnimationDuration,
} from "@/constants/theme";
import ReworkedCard from "../shared/reworked-card";

const AccountInfoCard = () => {
  return (
    <>
      <FadeInView
        duration={baseAnimationDuration}
        delay={baseAnimationDelayDuration * 1}
        visible={true}
        style={accountInfoStyles.infoContainer}
      >
        <ReworkedCard containerStyle={accountInfoStyles.card} contentStyle={accountInfoStyles.cardContent}>
          <ScrollView
            style={accountInfoStyles.infoScrollViewContainer}
            contentContainerStyle={accountInfoStyles.infoCardContent}
            showsVerticalScrollIndicator={false}
          >
            <AccountInfoView />
            <PartnerInfoView />
          </ScrollView>
        </ReworkedCard>
      </FadeInView>
    </>
  );
};
export default AccountInfoCard;
