import Header from "@/components/shared/header";
import SharedText from "@/components/shared/shared-text";
import { partnerInfoCardStyles } from "@/constants/stylesheets/components/account/partner/partner-info-card-styles";
import { View } from "react-native";

const PartnerInfoView = () => {
  return (
    <>
      <View>
        <Header headerText="Partners" subHeaderText=""  headerStyle={{marginTop: 0}}/>
        <View>
            <SharedText text="Partner 1" style={partnerInfoCardStyles.partnerNameText}/>
        </View>
      </View>
    </>
  );
};
export default PartnerInfoView;
