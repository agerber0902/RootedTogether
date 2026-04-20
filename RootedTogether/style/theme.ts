import { DimensionValue, Platform, TextStyle } from "react-native";
import { colorScheme } from "./colorScheme";

// Main Theme Object
// Carries values and not style objects
export const Theme = {
  // App Color Scheme
  colorScheme: colorScheme,
  //   App Fonts
  typography: {
    serif: "Cormorant_300Light",
    serifItalic: "Cormorant_300Light_Italic",
    serifMedium: "Cormorant_500Medium",
    sans: "SourceSans3_400Regular",

    size: {
      header: 30,
      subHeader: 24,

      cardHeader: 24,

      modalHeader: 16,

      affirmation: 40,
      affirmationForword: 24,

      button: 16,

      accountInfoTitle: 18,
      accountInfoValue: 18,

      friendDisplayName: 24,
      friendName: 16,

      emptyWarning: 24,
      pending: 18,
    },
  },
  //   Spacing
  spacing: {
    sm: 16,
    md: 24,
    lg: 30,
    xl: 32,
  },
  //   Borders
  borders: {
    cardRadius: 24,
    tabRadius: 24,
    inputRadius: 8,
  },
  elevation: {
    card: 6,
    modal: 6,
    button: 4,
    textInput: 1,
    picker: 8,
  },

  //   Shadows
  shadows: {
    card: {
      shadowColor: colorScheme.accent,
      shadowOpacity: 0.4,
      shadowRadius: 20,
      shadowOffset: { width: 8, height: 8 },

      // elevation: 6,
    },
    modal: {
      shadowColor: colorScheme.accent,
      shadowOpacity: 0.4,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },

      elevation: 6,
    },
    button: {
      shadowColor: colorScheme.accent,
      shadowOpacity: 0.4,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },

      elevation: 4,
    },
    textInput: {
      shadowColor: colorScheme.accent,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 8 },

      outlineStyle: undefined,

      elevation: 1,
    },
    picker: {
      shadowColor: colorScheme.accent,
      shadowOpacity: 0.7,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 10 },

      elevation: 8,
    },
  },
  // Base Text
  baseText: {
    flexShrink: 1,

    ...(Platform.OS === "web" && {
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }),
  } as TextStyle,
  // Animations
  animation: {
    delay: {
      baseDelay: 500,
      headerDelay: 1000,
      cardDelay: 1500,
    },
    duration: {
      baseDuration: 500,
      headerDuration: 1000,
      cardDuration: 1000,
    },
  },
};
