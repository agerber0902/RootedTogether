import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const affirmationCardStyle = StyleSheet.create({
    wrapper: {
        display: 'flex',

        // height: '90%',
        flex: 1,
        width: '100%',
        alignItems: 'stretch',
    },
    cardWrapper: {
        flex: 1,
    },
    container: {
        display: 'flex',
        width: '100%',
        // height: '100%',
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    actions: {
        display: 'flex',
        width: '90%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        gap: 15,

        paddingTop: Theme.spacing.sm,
    },
    nextButton: {
        width: '50%',
    },
    previousButton: {
        width: '50%',
    },
});