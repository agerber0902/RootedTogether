import { cardButtonStyle } from "@/style/stylesheets/components/shared/card-button-style";
import { Pressable, Text } from "react-native";

type CardButtonProps = {
  title: string;
  onPress: () => void;
  isDisabled: boolean;
  isSecondary?: boolean | undefined;
};

const CardButton = ({
  title,
  onPress,
  isDisabled,
  isSecondary = false,
}: CardButtonProps) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={[
          cardButtonStyle.container,
          !isSecondary
            ? cardButtonStyle.container
            : cardButtonStyle.secondaryContainer,
        ]}
        disabled={isDisabled}
      >
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
          cardButtonStyle.buttonText,
          !isSecondary
            ? cardButtonStyle.buttonText
            : cardButtonStyle.secondaryText,
        ]}
        >
          {title}
        </Text>
      </Pressable>
    </>
  );
};
export default CardButton;
