import { primaryButtonStyle } from "@/style/stylesheets/components/shared/primary-button-style";
import { Pressable, Text } from "react-native";

type PrimaryButtonProps = {
    title: string;
    onPress: () => void;
    isDisabled: boolean;
};

const PrimaryButton = ({title, onPress, isDisabled} : PrimaryButtonProps) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={primaryButtonStyle.container}
        disabled={isDisabled}
      >
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={primaryButtonStyle.buttonText}
        >
          {title}
        </Text>
      </Pressable>
    </>
  );
};
export default PrimaryButton;
