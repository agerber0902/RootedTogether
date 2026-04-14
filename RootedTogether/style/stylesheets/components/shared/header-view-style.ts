import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const headerViewStyle = StyleSheet.create({
  headerView: {
    width: "100%",
    height: "auto",

    padding: Theme.spacing.sm,
  },
  headerText: {
    width: "100%",

    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.header,
    color: Theme.colorScheme.headerText,
    marginTop: Theme.spacing.md,
    letterSpacing: -0.2,

    ...Theme.baseText,
  },
  subTitleText: {
    width: "100%",

    fontFamily: Theme.typography.serifItalic,
    fontSize: Theme.typography.size.subHeader,
    color: Theme.colorScheme.subHeaderText,
    letterSpacing: 0.3,

    ...Theme.baseText,
  },
});
