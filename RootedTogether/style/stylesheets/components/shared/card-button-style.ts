import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const cardButtonStyle = (hasShadow: boolean) => StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",

    paddingVertical: 14,
    paddingHorizontal: 5,

    backgroundColor: Theme.colorScheme.primaryButton,
    color: Theme.colorScheme.primaryButtonText,

    // Shadow
    ...(hasShadow && Theme.shadows.button ? Theme.shadows.button : {}),

    // Radius
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: Theme.typography.sans,
    fontSize: Theme.typography.size.button,

    color: Theme.colorScheme.primaryButtonText,

    textAlign: "center",

    ...Theme.baseText,
  },
  secondaryContainer: {
    // Style for the secondary button, which will be the same as primary, other than colors
    backgroundColor: Theme.colorScheme.secondaryButton,
  },
  secondaryText: {
    color: Theme.colorScheme.secondaryButtonText,
  },
});
