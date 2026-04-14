import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import {
  sharedSwitchStyle,
  switchColors,
} from "@/style/stylesheets/components/shared/shared-switch-style";

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
    <View style={sharedSwitchStyle.container}>
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
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={sharedSwitchStyle.text}
      >
        {text}
      </Text>
    </View>
  );
};
export default SharedSwitch;
