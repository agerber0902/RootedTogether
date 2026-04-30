import { Theme } from "@/style/theme";
import { Platform, StyleSheet } from "react-native";

export const safeAreaStyle = (screen: 'home' | 'affirmation' | 'account' | 'root') => StyleSheet.create({
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
        flex: (Platform.OS === 'ios' && Platform.isPad) ? 1.5 : (screen === 'home' ? 2.5 : screen === 'account' ? 2 : 2),
        width: '100%',
    },
    contentContainer: {
        flex: (Platform.OS === 'ios' && Platform.isPad) ? 8.5: (screen === 'home' ? 7.5 : screen === 'account' ? 8 : 8),
        width: '100%',
    },
});