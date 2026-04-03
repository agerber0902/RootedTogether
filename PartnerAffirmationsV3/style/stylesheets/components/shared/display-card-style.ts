import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const displayCardStyle = StyleSheet.create({
    cardContainer: {
        // Dimensions
        height: Theme.componentHeights.cardHeight,
        width: '100%',

        // Colors
        backgroundColor: Theme.colorScheme.card,

        // Borders + Shadows
        borderRadius: Theme.borders.cardRadius,
        ...Theme.shadows.card,

    },
    cardContent: {
        height: '100%',
        width: '100%',
    },
});