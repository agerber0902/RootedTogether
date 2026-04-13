import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const sharedPickerStyle = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",

    backgroundColor: "#0000",
  },
  picker: {
    backgroundColor: Theme.colorScheme.background,
    color: Theme.colorScheme.primaryText,
    borderRadius: Theme.borders.inputRadius,

    ...Theme.shadows.textInput,

    padding: Theme.spacing.sm,
  },
});
