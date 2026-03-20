import { shadows, Theme } from "@/constants/theme";
import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const sharedTextInputStyles = StyleSheet.create({
  textInputWrapper: {
    ...Theme.textInput,
    width: "100%",
    marginBottom: 5,
    backgroundColor: Theme.colors.background,
    minWidth: 0,

    ...shadows.textInput,
  } as ViewStyle,
  textInput: {
    color: Theme.colors.primaryText,
    fontStyle: 'normal',
    width: "100%",
    outlineStyle: Platform.OS === 'web' ? 'none' : undefined,
  } as TextStyle,
  placeholderText: {
    color: Theme.colors.primary,
    fontStyle: 'italic',
    width: "100%",
    outlineStyle: Platform.OS === 'web' ? 'none' : undefined,
  } as TextStyle,
});
