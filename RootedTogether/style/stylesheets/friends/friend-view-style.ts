import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const friendViewStyle = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",

    padding: Theme.spacing.sm,
  },
  headerText: {
    width: '100%',

    paddingBottom: 15,

    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.cardHeader,
    color: Theme.colorScheme.cardHeader,
    letterSpacing: -0.2,

    ...Theme.baseText,
  },
  actions: {
    width: '100%',

    paddingVertical: 5,
  },
});
