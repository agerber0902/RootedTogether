import { StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../../theme";

export const sharedSafeViewStyles = StyleSheet.create({
  safeArea: Theme.safeArea,
  loadingSpinner: Theme.loadingSpinner as ViewStyle,
  contentContainer: {
    width: "100%",
  },
});