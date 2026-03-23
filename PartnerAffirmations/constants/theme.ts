import { Platform, TextStyle, ViewStyle } from "react-native";

export const baseAnimationDuration = 1000;
export const baseAnimationDelayDuration = baseAnimationDuration / 2;

export const colors = {
  background: "#F6F0EA",
  tabBackground: "#F6F0EA",

  card: "#fffcf9", //'#F9F2EE',
  modal: "#F6F0EA",

  primaryText: "#42382e",
  secondaryText: "#605b42",

  primaryButton: "#898973",
  primaryButtonText: "#F6F0EA",

  secondaryButton: "#F6F0EA",

  affirmation: "#6b6158",
  partnerName: "#6b6158",
  partnerDisplayName: "#6b6158",

  primary: "#898973",

  accent: "#7A542E",

  tabInactive: "#b9ac98",
  tabActive: "#898973", //"#8f8964",
};

export const typography = {
  fontFamily: {
    serif: "Cormorant_300Light",

    serifMedium: "Cormorant_500Medium",

    sans: "SourceSans3_400Regular",

    sansMedium: "SourceSans3_500Medium",
  },

  sizes: {
    greeting: 30,
    modalHeader: 28,
    affirmation: 24,
    partner: 24,
    partnerSubName: 18,
    accountInfoHeader: 18,
    body: 16,
    small: 14,
    button: 16,
  },

  lineHeights: {
    affirmation: 38, // ~1.6 ratio
    body: 24,
  },

  letterSpacing: {
    greeting: -0.2,
    subtle: 0.3,
    wide: 0.5,
  },
};

export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
};

export const radius = {
  card: 24,
  modal: 24,
  button: 16,
  affirmationView: 16,
  full: 999,
  shadow: 20,
  tabs: 24,
};
export const shadows = {
  card: {
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: radius.shadow,
    shadowOffset: { width: 0, height: 8 },

    elevation: 6,
  },
  modal: {
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: radius.shadow,
    shadowOffset: { width: 0, height: 8 },

    elevation: 6,
  },
  button: {
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: radius.button,
    shadowOffset: { width: 0, height: 8 },

    elevation: 4,
  },
  textInput: {
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: radius.button,
    shadowOffset: { width: 0, height: 8 },
    
    outlineStyle: undefined,

    elevation: 1,
  },
  affirmationView: {
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: radius.affirmationView,
    shadowOffset: { width: 0, height: 8 },
    
    outlineStyle: undefined,

    elevation: 1,
  },
};

export const baseText = {
  flexShrink: 1,

  ...(Platform.OS === "web" && {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }),
} as TextStyle;

export const sharedModal = {
  modal: {
    backgroundColor: colors.modal,

    borderRadius: radius.modal,
    // Shadow
    ...shadows.modal,
  },
  header: {
    width: '100%',
    height: 'auto',

    fontFamily: typography.fontFamily.serif,
    fontSize: typography.sizes.modalHeader,
    color: colors.primaryText,
    marginBottom: spacing.sm,
    letterSpacing: typography.letterSpacing.greeting,

    paddingLeft: 15,

    ...baseText,
  },
};
export const buttons = {
  primary: {
    width: "100%",
    alignItems: "center",

    paddingVertical: 14,
    paddingHorizontal: 5,

    backgroundColor: colors.primaryButton,
    color: colors.primaryButtonText,

    // Shadow
    ...shadows.button,

    // Radius
    borderRadius: radius.button,
  } as ViewStyle,
  primaryText: {
    // Font
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.sizes.button,
    letterSpacing: typography.letterSpacing.subtle,

    color: colors.primaryButtonText,

    textAlign: "center",
  } as TextStyle,
};

export const inputTextWrapper = {
  backgroundColor: colors.background,
  text: colors.primaryText,
  placeholder: colors.secondaryText,
  border: "transparent",
  // borderColor: colors.primary,
  borderRadius: radius.button,
  // borderWidth: 1,

  shadow: shadows.textInput,

  padding: spacing.xs,

} as ViewStyle;

export const motion = {
  fadeSlow: 600,
  fadeMedium: 400,
  fadeFast: 250,
  easing: "easeOut",
};

export const Theme = {
  dark: false,
  colors: colors,
  typography: typography,
  modal: sharedModal,
  spacing: spacing,
  baseText: baseText,

  // Buttons
  primaryButton: buttons.primary,
  primaryButtonText: buttons.primaryText,
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  // Text Input
  textInput: inputTextWrapper,

  // Loading Spinner
  loadingSpinner: {
    display: "flex",
    flex: 1,

    margin: "auto",

    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    color: colors.primary,
  },

  // Safe Area Container
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },

  // Card
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    ...shadows.card,

    flex: 0.9,
  },

  // Affirmation Text
  affirmationText: {
    ...baseText,
    fontFamily: typography.fontFamily.serif,
    fontSize: typography.sizes.affirmation,
    lineHeight: typography.lineHeights.affirmation,
    textAlign: "center",
    color: colors.affirmation,
    letterSpacing: typography.letterSpacing.subtle,
  },
  partnerNameText: {
    ...baseText,
    fontFamily: typography.fontFamily.serif,
    fontSize: typography.sizes.partner,
    textAlign: "left",
    color: colors.partnerName,
    letterSpacing: typography.letterSpacing.subtle,
  },
  partnerDisplayNameText: {
    ...baseText,
    fontFamily: typography.fontFamily.serif,
    fontSize: typography.sizes.partnerSubName,
    textAlign: "left",
    color: colors.partnerDisplayName,
    letterSpacing: typography.letterSpacing.subtle,
  },
};
