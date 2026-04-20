import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const safeAreaStyle = StyleSheet.create({
    safeArea: {
        display: 'flex',

        // Dimensions
        // height: '100%',
        flex: 1,
        
        // Color
        backgroundColor: Theme.colorScheme.background,

        // Spacing
        paddingVertical: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.md,

    },
    headerContainer: {
        flex: 2.5
    },
    contentContainer: {
        flex: 7.5,
        width: '100%',
    },
});