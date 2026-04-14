import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const userCreatedAffirmationsCardStyle = StyleSheet.create({
  scrollView: {
    height: "auto",
    width: "100%",

    padding: Theme.spacing.sm,
  },
  buttonContainer: {
    display: "flex",
    width: "90%",

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: "auto",

    paddingVertical: Theme.spacing.md,
  },
  emptyWarningContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',

    paddingTop: '50%',
  },
});
