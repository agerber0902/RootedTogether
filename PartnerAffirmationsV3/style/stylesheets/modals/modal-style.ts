import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const modalStyle = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: Theme.spacing.sm,
  },
  modalContent: {
    width: "100%",
    maxHeight: "95%",
    backgroundColor: Theme.colorScheme.modal,
    borderRadius: Theme.borders.cardRadius,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,

    ...Theme.shadows.modal,
  },
  headerText: {
    width: "100%",

    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.header,
    color: Theme.colorScheme.headerText,
    letterSpacing: -0.2,

    ...Theme.baseText,
  },
  bodyText: {
    width: "100%",

    fontFamily: Theme.typography.sans,
    fontSize: 16,
    color: Theme.colorScheme.primaryText,

    ...Theme.baseText,
  },
  error: {
    paddingTop: 16,

    textAlign: 'center',

    fontFamily: Theme.typography.sans,
    color: Theme.colorScheme.error,
    fontSize: 16,

    ...Theme.baseText,
  },
});
