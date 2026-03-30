import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createdAffirmationsCardStyles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
  },
  card: {
    justifyContent: "flex-start",
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Theme.spacing.sm,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingBottom: Theme.spacing.sm,
  },
  buttonContainer: {
    width: "100%",
    marginTop: Theme.spacing.xs,
    paddingTop: Theme.spacing.xs,
    paddingBottom: Theme.spacing.sm,
  },
  noAffirmationTextContainer: {
    width: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  noAffirmationText: {
    width: "100%",

    color: Theme.colors.primaryText,
    fontFamily: Theme.typography.fontFamily.serif,
    fontSize: Theme.typography.sizes.affirmation,
  },
});
