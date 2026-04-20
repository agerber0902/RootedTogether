import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const displayCardStyle = StyleSheet.create({
    cardContainer: {
        display: 'flex',

        // Dimensions
        flex: 1,
        width: '100%',

        // Colors
        backgroundColor: Theme.colorScheme.card,

        // Borders + Shadows
        borderRadius: Theme.borders.cardRadius,
        ...Theme.shadows.card,

    },
    cardContent: {
        // height: '100%',
        flex: 1,
        width: '100%',
    },
});