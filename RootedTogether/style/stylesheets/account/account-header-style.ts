import { Theme } from "@/style/theme";
import { Platform, StyleSheet } from "react-native";

export const accountHeaderStyle = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,

        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    headerContainer: {
        display: 'flex',
        // width: '75%',
        flex: 6,

        justifyContent: 'flex-start',

        paddingHorizontal: 15,
    },
    placeholderView: {
        display: 'flex',
        flex: 3,
        width: '100%',
    },
    headerView: {
        display: 'flex',
        flex: 7,
        width: '100%',
    },
    actionContainer: {
        // width: '20%',
        display: 'flex',
        flex: 4,
        maxWidth: 200,
        
        paddingVertical: Theme.spacing.sm,
        paddingBottom: Platform.OS === 'web' ? 0 : (Platform.OS === 'ios' && Platform.isPad) ? 50 : 10,

        marginRight: 10,
    },
});