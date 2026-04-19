import { Platform, StyleSheet } from "react-native";

export const affirmationCardStyle = StyleSheet.create({
    wrapper: {
        height: '90%',
    },
    webCardWrapper: {
        ...(Platform.OS === "web" ? {minHeight: '500%'} : {}),
    },
    container: {
        display: 'flex',
        width: '100%',
        height: '90%',

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
    },
    nextButton: {
        width: '50%',
    },
    previousButton: {
        width: '50%',
    },
});