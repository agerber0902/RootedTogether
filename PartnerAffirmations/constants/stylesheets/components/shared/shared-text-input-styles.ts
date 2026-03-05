import { shadows, Theme } from "@/constants/theme";
import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const sharedTextInputStyles = StyleSheet.create({
  textInputWrapper: {
    ...Theme.textInput,
    marginBottom: 5,
    backgroundColor: Theme.colors.background,

    ...shadows.textInput,
  } as ViewStyle,
  textInput: {
    color: Theme.colors.primaryText,
    fontStyle: 'normal',
    outlineStyle: Platform.OS === 'web' ? 'none' : undefined,
  } as TextStyle,
  placeholderText: {
    color: Theme.colors.primary,
    fontStyle: 'italic',
    outlineStyle: Platform.OS === 'web' ? 'none' : undefined,
  } as TextStyle,
});
