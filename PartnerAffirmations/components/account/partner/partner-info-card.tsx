import SharedCard from "@/components/shared/shared-card";
import { partnerInfoCardStyles } from "@/constants/stylesheets/components/account/partner/partner-info-card-styles";
import PartnerInfoRow from "./partner-info-row";

const PartnerInfoCard = () => {
  return (
    <>
      <SharedCard
        cardContainerStyle={partnerInfoCardStyles.infoCardContainer}
        cardContentStyle={partnerInfoCardStyles.infoCardContent}
        visible={true}
      >
        <PartnerInfoRow />
      </SharedCard>
    </>
  );
};
export default PartnerInfoCard;
