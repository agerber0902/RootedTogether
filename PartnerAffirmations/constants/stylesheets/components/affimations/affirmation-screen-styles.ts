import { StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../../theme";

export const affirmationScreenStyles = StyleSheet.create({
  safeArea: Theme.safeArea,
  loadingSpinner: Theme.loadingSpinner as ViewStyle,
  
  noAffirmationTextContainer: {
    width: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  noAffirmationText: {
    width: "100%",

    color: Theme.colors.primaryText,
    fontFamily: Theme.typography.fontFamily.serif,
    fontSize: Theme.typography.sizes.affirmation,
  },
});
