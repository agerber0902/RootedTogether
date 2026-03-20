import { StyleSheet } from "react-native";

export const partnerInfoRowStyles = StyleSheet.create({
    mainContainer:{
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    partnerNameContainer: {
        width: '33%',
    },
    createdDateContainer: {
        width: '33%',
        textAlign: 'center',
    },
    actionContainer: {
        width: '33%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        
        gap: 10,
    },
});