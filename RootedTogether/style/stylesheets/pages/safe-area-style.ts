import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const safeAreaStyle = (screen: 'home' | 'affirmation' | 'account') => StyleSheet.create({
    safeArea: {
        display: 'flex',

        // Dimensions
        // height: '100%',
        flex: 1,
        
        // Color
        backgroundColor: Theme.colorScheme.background,

        // Spacing
        paddingVertical: Theme.spacing.xs,
        paddingHorizontal: Theme.spacing.md,

    },
    headerContainer: {
        flex: screen === 'home' ? 2.5 : screen === 'account' ? 2 : 2,
        width: '100%',
    },
    contentContainer: {
        flex: screen === 'home' ? 7.5 : screen === 'account' ? 8 : 8,
        width: '100%',
    },
});