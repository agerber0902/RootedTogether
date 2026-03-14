import { spacing, Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const accountInfoStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',

    flexDirection: "column",
    gap: Theme.spacing.md,

    flex: 1,

    paddingBottom: Theme.spacing.xs,

  },
  infoCardContainer: {
    flex: 1,
  },
  infoCardContent: {
    flex: 1,
     
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  infoContainer: {
    display: "flex",
    width: "100%",

    // flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: Theme.spacing.sm,
  },
  infoValueContainer: {
    display: "flex",
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoFieldContainer: {
    display: "flex",
    width: "90%",

    flexDirection: "row",
    alignItems: "center",
  },
  infoField: {
    display: "flex",
    maxWidth: "50%",

    flex: 1,

    paddingRight: 5,
  },
  infoFieldText: {
    color: Theme.colors.primaryText,
    fontFamily: Theme.typography.fontFamily.serif,
    fontSize: Theme.typography.sizes.accountInfoHeader,

    textAlign: "left",
  },
  infoFieldValue: {
    display: "flex",
    width: "50%",

    flex: 2,
  },
  infoFieldValueText: {
    color: Theme.colors.primaryText,
    fontFamily: Theme.typography.fontFamily.serifMedium,
    fontSize: Theme.typography.sizes.accountInfoHeader,

    textAlign: "left",
  },
  editButtonView: {
    display: "flex",

    alignSelf: "center",
  },
  cancelButton: {
    width: "35%",
    backgroundColor: Theme.colors.secondaryButton,
  },
  cancelButtonText: {
    color: Theme.colors.secondaryText,
  },
  actions: {
    width: "100%",
    display: "flex",

    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,

    flexDirection: "row",
    justifyContent: "center",
  },
});
