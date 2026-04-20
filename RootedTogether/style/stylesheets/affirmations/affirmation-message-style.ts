import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const affirmationMessageStyle = StyleSheet.create({
  container: {
    width: '95%',
    // height: '100%',

    alignItems: 'center',
    justifyContent: 'center'
  },
  forword: {
    width: "100%",
    // height: "auto",

    ...Theme.baseText,
    fontFamily: Theme.typography.serifItalic,
    fontSize: Theme.typography.size.affirmationForword,
    color: Theme.colorScheme.affirmationForword,
    letterSpacing: 0.5,

    textAlign: "center",
  },
  message: {
    width: "100%",
    // height: "auto",

    ...Theme.baseText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.affirmation,
    color: Theme.colorScheme.affirmation,
    letterSpacing: 0.5,

    textAlign: "center",
  },
});
