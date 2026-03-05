import { StyleSheet } from "react-native";
import { spacing, Theme } from "../../theme";

export const addAffirmationModalStyles =
  StyleSheet.create({
    form: {
      display: "flex",
      width: "75%",
      
      flex: 1,

      paddingTop: 5,

      flexDirection: "column",
      justifyContent: "flex-start",
      alignSelf: "center",
    },
    inputs: {
      padding: spacing.sm,
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
    toggleAction: {
      width: "100%",

      paddingTop: 5,

      color: Theme.colors.white,
      fontStyle: "italic",
    },
    error: {
      color: Theme.colors.notification,
    },
  });
