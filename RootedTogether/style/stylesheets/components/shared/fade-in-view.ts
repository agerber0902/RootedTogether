import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const fadeInViewStyle = StyleSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        
        backgroundColor: Theme.colorScheme.background,
        borderRadius: Theme.borders.cardRadius,
        
    }
});