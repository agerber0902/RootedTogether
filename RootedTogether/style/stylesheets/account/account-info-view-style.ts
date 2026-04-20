import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const accountInfoViewStyle = StyleSheet.create({
    container: {
        // height: '100%',
        width: '100%',
        flex: 1,

        padding: Theme.spacing.sm,
    },
    actionWrapper: {
        width: '45%',
    },
    editActions: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        gap: Theme.spacing.sm,
    },
        errorText: {
            paddingTop: Theme.spacing.sm,

            color: Theme.colorScheme.error,
            fontFamily: Theme.typography.sans,
            fontSize: 16,

            textAlign: 'center',

            ...Theme.baseText,
        },
});