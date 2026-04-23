import { cardButtonStyle } from "@/style/stylesheets/components/shared/card-button-style";
import { Pressable, Text } from "react-native";

type CardButtonProps = {
  title: string;
  onPress: () => void;
  isDisabled: boolean;
  isSecondary?: boolean | undefined;
  hasShadow?: boolean;
  isDelete?: boolean;
};

const CardButton = ({
  title,
  onPress,
  isDisabled,
  isSecondary = false,
  hasShadow = true,
  isDelete = false,
}: CardButtonProps) => {
  const cardButtonStyles = cardButtonStyle(hasShadow, isDelete);

  return (
    <>
      <Pressable
        onPress={onPress}
        style={[
          cardButtonStyles.container,
          !isSecondary
            ? cardButtonStyles.container
            : cardButtonStyles.secondaryContainer,
        ]}
        disabled={isDisabled}
      >
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
          cardButtonStyles.buttonText,
          !isSecondary
            ? cardButtonStyles.buttonText
            : cardButtonStyles.secondaryText,
        ]}
        >
          {title}
        </Text>
      </Pressable>
    </>
  );
};
export default CardButton;
