import { useAuth } from "@/providers/auth-provider";
import FadeInView from "../shared/fade-in-animated-view";
import { View } from "react-native";
import AffirmationText from "./affirmation-text";
import Button from "../shared/button";
import { affirmationCardStyles } from "@/constants/stylesheets/components/affimations/affirmation-card-styles";
import {
  baseAnimationDelayDuration,
  baseAnimationDuration,
} from "@/constants/theme";
import { useAppSelector } from "@/state/hooks";

const AffirmationCard = () => {
  const { isAuthenticated } = useAuth();

  const { todaysAffirmation } = useAppSelector(
    (state) => state.affirmation.value,
  );
  const message =
    todaysAffirmation?.affirmation?.message ??
    "You are the designer of your best life";

  return (
    <>
      <FadeInView
        duration={baseAnimationDuration}
        delay={baseAnimationDelayDuration * 3}
        visible={isAuthenticated}
        style={affirmationCardStyles.cardContainer}
      >
        <View style={affirmationCardStyles.cardContent}>
          <View style={affirmationCardStyles.cardTitle}>
            <AffirmationText text={message} />
          </View>

          <View style={affirmationCardStyles.cardButton}>
            <Button onPress={() => {}} title={"Next Affirmation"} />
          </View>
        </View>
      </FadeInView>
    </>
  );
};
export default AffirmationCard;
