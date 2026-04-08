import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const editableAccountValueStyle = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "auto",

    flexDirection: "row",
    alignItems: 'center',

    paddingVertical: 5,

  },
  title: {
    width: "25%",

    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.accountInfoTitle,

    textAlign: "left",
  },
  value: {
    width: "75%",

    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.accountInfoTitle,

    textAlign: "left",
  },
});
