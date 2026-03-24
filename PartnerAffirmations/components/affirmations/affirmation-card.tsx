import { useAuth } from "@/providers/auth-provider";
import FadeInView from "../shared/fade-in-animated-view";
import { View } from "react-native";
import AffirmationText from "./affirmation-text";
import { affirmationCardStyles } from "@/constants/stylesheets/components/affimations/affirmation-card-styles";
import {
  baseAnimationDelayDuration,
  baseAnimationDuration,
} from "@/constants/theme";
import { useAppSelector } from "@/state/hooks";
import ReworkedCard from "../shared/reworked-card";

const AffirmationCard = () => {
  const { isAuthenticated } = useAuth();

  const { todaysAffirmation } = useAppSelector(
    (state) => state.affirmation.value,
  );
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { displayConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );

  const message: string =
    todaysAffirmation?.affirmation?.message ??
    "You are the designer of your best life";

  const getForword = (): string => {
    if (!todaysAffirmation?.affirmation?.message) {
      return "";
    }

    if (todaysAffirmation.affirmation.recipientId === affirmationUser?.uid) {
      return "You wanted to remind yourself: ";
    }

    const displayName = displayConnections.find(
      (dc) => dc.partnerId === todaysAffirmation.affirmation?.recipientId,
    )?.partnerDisplayName;
    if (displayName) {
      return `${displayName} wanted to remind you: `;
    }

    return "";
  };

  return (
    <>
      <FadeInView
        duration={baseAnimationDuration}
        delay={baseAnimationDelayDuration * 3}
        visible={isAuthenticated}
        style={affirmationCardStyles.cardContainer}
      >
        <ReworkedCard>
          <AffirmationText text={getForword()} />
          <AffirmationText
            style={{ fontSize: 40, paddingTop: 15, lineHeight: 45 }}
            text={message}
          />
        </ReworkedCard>
      </FadeInView>
    </>
  );
};
export default AffirmationCard;
