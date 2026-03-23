import { StyleSheet, TextStyle } from "react-native";
import { Theme } from "../../theme";

export const sharedModalStyles =
  StyleSheet.create({
    modalContainer: {
        width: "95%",
        height: "auto",
        maxHeight: "72%",
        flex: 1,

        margin: 0, //needed for react-native-modal
        
        alignSelf: "center",
        
    },
    modalView: {
      ...Theme.modal.modal,

      width: "100%",
      height: "80%",

      padding: 5,

      flexDirection: "column",
    },
    modalHeader: {
      display: "flex", 
      paddingTop: 10,

      ...Theme.modal.header as TextStyle,
    },
    modalContent: {
      flex: 1,
      alignItems: "center",
    },
  });
