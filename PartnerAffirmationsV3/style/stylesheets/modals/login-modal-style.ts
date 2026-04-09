import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const loginModalStyle = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",

    flexDirection: "column",
    gap: Theme.spacing.sm,
  },
  inputs: {
    display: "flex",
    width: "100%",

    flexDirection: "column",
    gap: 5,

    paddingVertical: Theme.spacing.md,
  },
  actions: {
    display: "flex",
    width: "100%",

    flexDirection: "column",
    gap: 5,
  },
  toggleButton: {
    paddingLeft: 8,

    fontFamily: Theme.typography.sans,
    color: Theme.colorScheme.primaryText,
    fontSize: 16,
  },
  editableInput: {
    width: '100%',

    borderWidth: 1,
    borderColor: "rgba(122, 84, 46, 0.25)",
    borderRadius: Theme.borders.inputRadius,
    backgroundColor: Theme.colorScheme.card,

    overflowX: "hidden",

    padding: Theme.spacing.sm,

    ...Theme.shadows.textInput,
  },
});
