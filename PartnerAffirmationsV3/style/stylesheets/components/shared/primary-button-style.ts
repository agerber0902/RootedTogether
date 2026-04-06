import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const primaryButtonStyle = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",

    paddingVertical: 14,
    paddingHorizontal: 5,

    backgroundColor: Theme.colorScheme.primaryButtonColor,
    color: Theme.colorScheme.primaryButtonText,

    // Shadow
    ...Theme.shadows.button,

    // Radius
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: Theme.typography.sans,
    fontSize: Theme.typography.size.button,

    color: Theme.colorScheme.primaryButtonText,

    textAlign: "center",
  },
});
