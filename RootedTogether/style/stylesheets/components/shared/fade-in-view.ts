import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const fadeInViewStyle = StyleSheet.create({
    container: {
        display: 'flex',
        // width: 'auto',
        // height: 'auto',

        flex: 1,

        flexDirection: 'column',

        backgroundColor: Theme.colorScheme.background,
        borderRadius: Theme.borders.cardRadius,
        
    }
});