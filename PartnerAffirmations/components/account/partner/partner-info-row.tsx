import { partnerInfoRowStyles } from "@/constants/stylesheets/components/account/partner/partner-info-row-styles";
import { Platform, useWindowDimensions, View } from "react-native";
import PartnerNameText from "./partner-name-text";
import SharedText from "@/components/shared/shared-text";
import { partnerInfoTextStyles } from "@/constants/stylesheets/components/account/partner/partner-info-text-styles";
import EditIconButton from "@/components/shared/edit-icon-button";
import DeleteIconButton from "@/components/shared/delete-icon-button";

const PartnerInfoRow = () => {
  const partnerStartDate = new Date().toLocaleDateString();

  const { width } = useWindowDimensions();

  const lineBreak = Platform.OS !== "web" || width < 700;
  return (
    <>
      <View style={partnerInfoRowStyles.mainContainer}>
        <View style={partnerInfoRowStyles.partnerNameContainer}>
          <PartnerNameText />
        </View>
        <View style={partnerInfoRowStyles.createdDateContainer}>
          {lineBreak && (
            <SharedText
              style={partnerInfoTextStyles.partnerFullName}
              text={`Partners Since:`}
            />
          )}
          <SharedText
            style={partnerInfoTextStyles.partnerFullName}
            text={`${!lineBreak ? 'Partners Since: ': ''}${partnerStartDate}`}
          />
        </View>
        <View style={partnerInfoRowStyles.actionContainer}>
          <EditIconButton onEdit={() => {}} />
          <DeleteIconButton onClick={() => {}} />
        </View>
      </View>
    </>
  );
};
export default PartnerInfoRow;
