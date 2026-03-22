import { colors, radius, shadows, spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const sharedPickerStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",

    backgroundColor: "#0000",
  },
  picker: {
    backgroundColor: colors.background,
    color: colors.primaryText,
    // borderColor: colors.primary,
    borderRadius: radius.button,
    // borderWidth: 1,

    ...shadows.textInput,

    padding: spacing.xs,
  },
});
