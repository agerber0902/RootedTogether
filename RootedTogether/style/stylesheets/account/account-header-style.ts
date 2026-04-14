import { StyleSheet } from "react-native";

export const accountHeaderStyle = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'space-between',
        
    },
    headerContainer: {
        display: 'flex',
        width: '75%',

        justifyContent: 'flex-end',
    },
    actionContainer: {
        width: '20%',
        
        paddingBottom: 10,

        marginRight: 5,
    },
});