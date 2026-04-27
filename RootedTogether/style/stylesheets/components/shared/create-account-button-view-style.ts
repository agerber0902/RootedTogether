import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const createAccountButtonViewStyle = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

        gap: Theme.spacing.sm,
    },
    infoTextContainer: {
        display: 'flex',
        width: '90%',

        justifyContent: 'center',
    },
    infoText: {
        ...Theme.baseText,

        color: Theme.colorScheme.primaryText,
        fontFamily: Theme.typography.serifMedium,
        fontSize: Theme.typography.size.createAccountHeader,

        textAlign: 'center',
    },

    createButtonContainer: {
        width: '75%',
    },
});