import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const accountInfoViewStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',

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
});