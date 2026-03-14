import SharedCard from "@/components/shared/shared-card";
import { partnerInfoCardStyles } from "@/constants/stylesheets/components/account/partner/partner-info-card-styles";
import PartnerInfoRow from "./partner-info-row";
import Button from "@/components/shared/button";
import { View } from "react-native";

const PartnerInfoCard = () => {
  return (
    <>
      <SharedCard
        cardContainerStyle={partnerInfoCardStyles.infoCardContainer}
        cardContentStyle={partnerInfoCardStyles.infoCardContent}
        visible={true}
      >
        <PartnerInfoRow />

        <View style={partnerInfoCardStyles.actions}>
          <Button
            viewStyle={partnerInfoCardStyles.addButton}
            title="Add Partner"
            onPress={() => {}}
          />
        </View>
      </SharedCard>
    </>
  );
};
export default PartnerInfoCard;
