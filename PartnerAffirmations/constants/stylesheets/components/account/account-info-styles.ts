import { spacing, Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const accountInfoStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: Theme.spacing.md,
    flex: 1,
    minHeight: 0,
    paddingBottom: Theme.spacing.sm,
  },
  infoScrollViewContainer: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
  },
  infoCardContent: {
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: Theme.spacing.md,
  },
  card: {
    justifyContent: "flex-start",
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: Theme.spacing.md,
  },
  infoContainer: {
    display: "flex",
    width: "100%",
    height: "100%",

    flexShrink: 1,
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
    minWidth: 0,
  },
  infoFieldContainer: {
    display: "flex",
    width: "100%",
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  infoField: {
    display: "flex",
    maxWidth: "45%",
    flexShrink: 1,

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
    flex: 1,
    minWidth: 0,
  },
  infoFieldValueText: {
    color: Theme.colors.primaryText,
    fontFamily: Theme.typography.fontFamily.serifMedium,
    fontSize: Theme.typography.sizes.accountInfoHeader,

    textAlign: "left",
    flexShrink: 1,
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
