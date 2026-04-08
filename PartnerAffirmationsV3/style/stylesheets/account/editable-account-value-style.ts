import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";
const valueWidth = '75%';
const titleWidth = '25%';
const inputPadding = 10;

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
    width: titleWidth,

    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.accountInfoTitle,

    textAlign: "left",
  },
  value: {
    width: valueWidth,

    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.accountInfoTitle,

    padding: inputPadding,

    textAlign: "left",
  },
  editableInput: {
    width: valueWidth,

    borderWidth: 1,
    borderColor: 'rgba(122, 84, 46, 0.25)',
    borderRadius: Theme.borders.inputRadius,
    backgroundColor: Theme.colorScheme.card,

    overflowX: 'hidden',

    padding: inputPadding,

    ...Theme.shadows.textInput,
  },
});
