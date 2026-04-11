import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const partnerConnectionModalStyle = StyleSheet.create({
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
  actionWrapper: {
    width: '45%',
  },
  actions: {
    display: "flex",
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: Theme.spacing.sm,
    
  },
  editableInput: {
    width: "100%",

    borderWidth: 1,
    borderColor: "rgba(122, 84, 46, 0.25)",
    borderRadius: Theme.borders.inputRadius,
    backgroundColor: Theme.colorScheme.card,

    overflowX: "hidden",

    padding: Theme.spacing.sm,

    ...Theme.shadows.textInput,
  },
});
