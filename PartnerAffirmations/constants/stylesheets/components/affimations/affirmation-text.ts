import { StyleSheet, TextStyle } from "react-native";
import { Theme } from "../../../theme";

export const affirmationTextStyles = StyleSheet.create({
    textContainer: {
        width: '100%',
        display: 'flex',

        overflow: "hidden",
    },
    textContent: {
        width: "100%",

        ...Theme.affirmationText,
    } as TextStyle,
});