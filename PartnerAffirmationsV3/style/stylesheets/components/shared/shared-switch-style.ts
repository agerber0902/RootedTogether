import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const switchColors = {
  disabled: "#ccc",
  enabled: Theme.colorScheme.primaryButton,
};

export const sharedSwitchStyle = StyleSheet.create({
  container: {
    display: "flex",

    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Theme.colorScheme.primaryButton,
    textAlign: "left",
    paddingLeft: 5,
  },
});
