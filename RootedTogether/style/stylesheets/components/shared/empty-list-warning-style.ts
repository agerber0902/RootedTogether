import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const emptyListWarningStyle = StyleSheet.create({
    text: {
        width: '100%',

        color: Theme.colorScheme.primaryText,
        fontSize: Theme.typography.size.emptyWarning,
        fontFamily: Theme.typography.serifItalic,

        textAlign: 'center',

        ...Theme.baseText,
    },
});