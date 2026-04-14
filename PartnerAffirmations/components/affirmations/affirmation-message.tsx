import { Affirmation } from "@/models/affirmation";
import { affirmationMessageStyle } from "@/style/stylesheets/affirmations/affirmation-message-style";
import { Text, View } from "react-native";

type AffirmationMessageProp = {
  affirmation: Affirmation | undefined;
  partnerDisplayName: string | undefined;
};

const AffirmationMessage = ({
  affirmation,
  partnerDisplayName,
}: AffirmationMessageProp) => {
  const forword = (): string => {
    return !affirmation || !partnerDisplayName
      ? ""
      : partnerDisplayName === "You"
        ? "You wanted to remind yourself: "
        : `${partnerDisplayName} wanted to remind you: `;
  };

  return (
    <>
      <View style={affirmationMessageStyle.container}>
        <Text
          style={affirmationMessageStyle.forword}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {forword()}
        </Text>

        <Text
          style={affirmationMessageStyle.message}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {affirmation?.message ??
            "You are the designer of your best life!"}
        </Text>
      </View>
    </>
  );
};
export default AffirmationMessage;
