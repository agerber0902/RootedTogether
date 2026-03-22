import { buttons, colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const switchColors = {
  disabled: "#ccc",
  enabled: colors.primaryButton,
};

export const sharedSwitchStyles = StyleSheet.create({
  container: {
    display: "flex",

    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    ...buttons.primaryText,
    color: colors.primary,
    textAlign: "left",
    paddingLeft: 5,
  },
});
