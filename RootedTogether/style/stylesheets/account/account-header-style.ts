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

        paddingRight: 15,
    },
    actionContainer: {
        // width: '20%',
        display: 'flex',
        flex: 4,
        maxWidth: 200,
        
        paddingVertical: Theme.spacing.sm,
        paddingBottom: Platform.OS === 'web' ? 0 : 50,

        marginRight: 10,
    },
});