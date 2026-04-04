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
    serifMedium: "Cormorant_500Medium",
    sans: "SourceSans3_400Regular",

    size: {
      header: 30,
      subHeader: 24,

      modalHeader: 16,
    },
  },
  //   Heights
  componentHeights: {
    cardHeight: (Platform.OS === "web" ? "90%" : "80%") as DimensionValue,
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
  },
  //   Shadows
  shadows: {
    card: {
      shadowColor: colorScheme.accent,
      shadowOpacity: 0.4,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },

      elevation: 6,
    },
    modal: {
      shadowColor: colorScheme.accent,
      shadowOpacity: 0.4,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },

      elevation: 6,
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
