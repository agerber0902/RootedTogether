import { StyleSheet, TextStyle } from "react-native";
import { Theme } from "../../theme";

export const sharedModalStyles =
  StyleSheet.create({
    modalContainer: {
        width: "95%",
        height: "auto",
        maxHeight: "90%",
        flex: 1,

        margin: 0, //needed for react-native-modal
        
        alignSelf: "center",
        
    },
    modalView: {
      ...Theme.modal.modal,

      width: "100%",
      height: "auto",

      padding: 5,

    },
    modalHeader: {
      display: "flex", 
      paddingTop: 10,

      ...Theme.modal.header as TextStyle,
    },
  });
