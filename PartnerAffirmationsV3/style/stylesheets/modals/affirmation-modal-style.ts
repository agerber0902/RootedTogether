import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const affirmationModalStyle = StyleSheet.create({
  inputs: {
    padding: Theme.spacing.sm,
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
  subHeader: {
    height: "auto",

    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.modalHeader - 10,
    color: Theme.colorScheme.primaryText,
    marginBottom: Theme.spacing.sm,

    paddingLeft: 5,
  },
  datePickerContainer: {
    width: '100%',

    paddingBottom: Theme.spacing.sm,
  },
  dateContainer: {
    width: '100%',
  },
  switchContainer: {
    paddingBottom: 5,
  },
  recipientPickerContainer: {
    width: '100%',
  },
  actions: {
    display: "flex",
    width: "50%",

    flexDirection: "column",
    alignSelf: "center",

    marginTop: "auto",
    paddingBottom: Theme.spacing.sm,
  },
});
