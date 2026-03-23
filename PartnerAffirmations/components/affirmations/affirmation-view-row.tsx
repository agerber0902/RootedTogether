import { Affirmation } from "@/constants/models/affirmation";
import { View } from "react-native";
import AffirmationText from "./affirmation-text";
import { affirmationCardStyles } from "@/constants/stylesheets/components/affimations/affirmation-card-styles";
import SharedText from "../shared/shared-text";
import { affirmationViewRowStyles } from "@/constants/stylesheets/components/affimations/affirmation-view-row-styles";
import { useAppSelector } from "@/state/hooks";

type AffirmationViewRowProps = {
  affirmation: Affirmation;
};

const AffirmationViewRow = ({ affirmation }: AffirmationViewRowProps) => {
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { displayConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );

  const getDisplayName = () => {
    if (affirmation.recipientId === affirmationUser?.uid) {
      return "You";
    }
    // Check connections
    return (
      displayConnections.find((dc) => dc.partnerId === affirmation.recipientId)
        ?.partnerDisplayName ?? ""
    );
  };

  return (
    <View>
      <AffirmationText
        key={affirmation.id}
        style={affirmationCardStyles.affirmation}
        text={affirmation.message}
      />
      <View style={affirmationViewRowStyles.subContainer}>
        <SharedText
          style={affirmationViewRowStyles.userText}
          text={`For: ${getDisplayName()}`}
        />
        <SharedText
          style={affirmationViewRowStyles.dateText}
          text={
            (affirmation.displayDate &&
              `${
                new Date(affirmation.displayDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                }) || ""
              }`) ||
            ""
          }
        />
      </View>
    </View>
  );
};
export default AffirmationViewRow;
