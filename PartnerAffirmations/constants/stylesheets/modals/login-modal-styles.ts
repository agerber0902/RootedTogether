import { StyleSheet } from "react-native";
import { spacing, Theme } from "../../theme";

export const loginModalStyles =
  StyleSheet.create({
    loginForm: {
      display: "flex",
      width: "75%",
      flex: 1,

      paddingTop: 5,

      flexDirection: "column",
      justifyContent: "center",
      alignSelf: "center",
    },
    input: Theme.textInput,
    
    actions: {
      display: "flex",
      width: "50%",

      flexDirection: "column",
      alignSelf: "center",

      marginTop: spacing.lg,
      paddingBottom: 15,
    },
    toggleAction: {
      width: "100%",

      paddingTop: 5,

      color: Theme.colors.primaryText,
      fontStyle: "italic",
    },
    error: {
      color: Theme.colors.primaryText,
    },
  });
