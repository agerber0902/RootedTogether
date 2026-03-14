import SharedText from "@/components/shared/shared-text";
import { partnerInfoTextStyles } from "@/constants/stylesheets/components/account/partner/partner-info-text-styles";
import { View } from "react-native";

const PartnerNameText = () => {
    const partnerName = 'Andrew Gerber';
    const partnerDisplayName = 'Andrew';

    return <>
    <View style={partnerInfoTextStyles.mainContainer}>
        <SharedText style={partnerInfoTextStyles.partnerDisplayName} text={partnerDisplayName}/>
        <SharedText style={partnerInfoTextStyles.partnerFullName} text={partnerName}/>
    </View>
    </>
};
export default PartnerNameText;