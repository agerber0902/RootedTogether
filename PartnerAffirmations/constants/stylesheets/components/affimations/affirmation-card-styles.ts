import { StyleSheet, ViewStyle } from "react-native";
import { spacing, Theme } from "../../../theme";
import { sharedCardStyles } from "../shared/shared-card-styles";

export const affirmationCardStyles = StyleSheet.create({
  cardContainer: {
    ...sharedCardStyles.cardContainer,
  },
  cardContent: {
    textAlign: "left",
  } as ViewStyle,
  cardTitle: {
    display: "flex",
    width: "100%",
  },
  cardButton: {
    width: "50%",
    marginTop: spacing.xxl,
    marginHorizontal: "auto",
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
  scrollView: {
    flex: 1,
  },
  affirmation: {
    textAlign: "left",
  },
  addButton: {},
});
