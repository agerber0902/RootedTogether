import {
  sharedSwitchStyles,
  switchColors,
} from "@/constants/stylesheets/components/shared/shared-switch-styles";
import { Pressable, View } from "react-native";
import SharedText from "./shared-text";
import { useState } from "react";

type SharedSwitchProps = {
  text: string;
  onPress: (flag: boolean) => void;
};
const SharedSwitch = ({ text, onPress }: SharedSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const onPressed = () => {
    setIsEnabled(!isEnabled);

    onPress(!isEnabled);
  };

  return (
    <View style={sharedSwitchStyles.container}>
      <Pressable
        onPress={onPressed}
        style={{
          width: 50,
          height: 30,
          borderRadius: 20,
          backgroundColor: isEnabled
            ? switchColors.enabled
            : switchColors.disabled,
          justifyContent: "center",
          padding: 3,
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#fff",
            alignSelf: isEnabled ? "flex-end" : "flex-start",
          }}
        />
      </Pressable>
      <SharedText style={sharedSwitchStyles.text} text={text}></SharedText>
    </View>
  );
};
export default SharedSwitch;
