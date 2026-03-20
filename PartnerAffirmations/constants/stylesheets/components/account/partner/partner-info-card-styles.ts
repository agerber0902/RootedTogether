import { radius, shadows, spacing, Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const partnerInfoCardStyles = StyleSheet.create({
  infoCardContainer: {
    backgroundColor: Theme.colors.card,
    borderRadius: radius.card,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    ...shadows.card,

    flex: 1,
  },
  infoCardContent: {
    flex: 1,

    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  actions: {
    display: "flex",
    width: "100%",
    paddingTop: Theme.spacing.lg,
  },
  addButton: {
    width: "50%",

    alignSelf: "center",
  },
  noPartnersText: {
    width: "100%",

    color: Theme.colors.primaryText,
    fontFamily: Theme.typography.fontFamily.serif,
    fontSize: Theme.typography.sizes.affirmation,

    textAlign: "center",
  },
});
