import { StyleSheet } from "react-native";
import { spacing, Theme } from "../../../theme";
import { sharedCardStyles } from "../shared/shared-card-styles";

export const affirmationCardStyles = StyleSheet.create({
    cardContainer: {
        ...sharedCardStyles.cardContainer,
    },
    cardContent: {
        textAlign: 'left',
        
    },
    cardTitle: {
        display: 'flex',
        width: '100%',
    },
    cardButton: {
        width: '50%',
        marginTop: spacing.xxl,
        marginHorizontal: 'auto',
    },
    scrollView: {
        flex: 1,
    },
    affirmation: {
        textAlign: 'left'
    },
    addButton: {},
});