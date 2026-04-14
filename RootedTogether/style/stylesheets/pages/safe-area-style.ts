import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const safeAreaStyle = StyleSheet.create({
    safeArea: {
        // Dimensions
        height: '100%',

        // Color
        backgroundColor: Theme.colorScheme.background,

        // Spacing
        paddingVertical: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.md,

    },
});