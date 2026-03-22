import { StyleSheet } from "react-native";
import { baseText, colors, spacing, typography } from "../../theme";

export const addAffirmationModalStyles = StyleSheet.create({
  form: {
    display: "flex",
    width: "75%",

    flex: 1,

    paddingTop: 5,

    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  subHeader: {
    height: "auto",

    fontFamily: typography.fontFamily.serif,
    fontSize: typography.sizes.modalHeader - 10,
    color: colors.primaryText,
    marginBottom: spacing.xs,
    letterSpacing: typography.letterSpacing.greeting,

    paddingLeft: 5,

    ...baseText,
  },
  inputs: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  input: {
    width: "100%",
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  actions: {
    display: "flex",
    width: "50%",

    flexDirection: "column",
    alignSelf: "center",

    marginTop: "auto",
    paddingBottom: 15,
  },
});
