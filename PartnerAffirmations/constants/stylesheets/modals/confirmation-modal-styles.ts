import { spacing, Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const confirmationModalStyles =
  StyleSheet.create({
    content:{
        width: '100%',
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        paddingLeft: spacing.md,
        color: Theme.colors.primary,
    },
    button: {
        width: '35%',
    },
    cancelButton: {
        width: '35%',
        backgroundColor: Theme.colors.secondaryButton,
    },
    cancelButtonText:{
        color: Theme.colors.secondaryText,
    },
    actions: {
        width: '100%',
        display: 'flex',

        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
        gap: spacing.sm,

        flexDirection: 'row',
        justifyContent: 'center',
    }
  });
