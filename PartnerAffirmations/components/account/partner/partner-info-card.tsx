import SharedCard from "@/components/shared/shared-card";
import { partnerInfoCardStyles } from "@/constants/stylesheets/components/account/partner/partner-info-card-styles";
import PartnerInfoView from "./partner-info-view";

const PartnerInfoCard = () => {
  return (
    <>
      <SharedCard
        cardContainerStyle={partnerInfoCardStyles.infoCardContainer}
        cardContentStyle={partnerInfoCardStyles.infoCardContent}
        visible={true}
      >
        <PartnerInfoView />
      </SharedCard>
    </>
  );
};
export default PartnerInfoCard;
