import { useAppSelector } from "@/state/hooks";
import DisplayCard from "../shared/display-card";
import { View } from "react-native";
import AffirmationMessage from "./affirmation-message";
import { affirmationCardStyle } from "@/style/stylesheets/affirmations/affirmation-card-style";
import CardButton from "../shared/card-button";
import { useEffect, useState } from "react";

const AffirmationCard = () => {
  const { todaysAffirmations } = useAppSelector(
    (state) => state.affirmation.value,
  );

  const flattenedAffirmations = todaysAffirmations.flatMap(
    (todayAffirmation) => {
      const source = todayAffirmation.affirmation;

      if (!source) {
        return [];
      }

      const affirmations = Array.isArray(source) ? source : [source];

      return affirmations.map((affirmation) => ({
        affirmation,
        friendDisplayName: todayAffirmation.friendDisplayName,
      }));
    },
  );

  const [affirmationIndex, setAffirmationIndex] = useState<number>(0);
  const currentAffirmation = flattenedAffirmations[affirmationIndex];
  const canCycleAffirmations = flattenedAffirmations.length > 1;

  useEffect(() => {
    if (affirmationIndex >= flattenedAffirmations.length) {
      setAffirmationIndex(0);
    }
  }, [affirmationIndex, flattenedAffirmations.length]);

  const onNext = () => {
    if (flattenedAffirmations.length === 0) {
      return;
    }

    if (affirmationIndex === flattenedAffirmations.length - 1) {
      // Recycle
      setAffirmationIndex(0);
    } else {
      setAffirmationIndex(affirmationIndex + 1);
    }
  };

  return (
    <View style={affirmationCardStyle.wrapper}>
      <DisplayCard>
        <View style={affirmationCardStyle.container}>
          <View>{/* Placeholder for styling */}</View>
          {/* Message */}
          <AffirmationMessage
            affirmation={currentAffirmation?.affirmation}
            friendDisplayName={currentAffirmation?.friendDisplayName}
          />
          {/* {todaysAffirmations.length > 1 && */}
          <View style={affirmationCardStyle.actions}>
            <View style={affirmationCardStyle.nextButton}>
              <CardButton
                title="Next Affirmation"
                onPress={onNext}
                isDisabled={!canCycleAffirmations}
              />
            </View>
          </View>
          {/* } */}
        </View>
      </DisplayCard>
    </View>
  );
};
export default AffirmationCard;
