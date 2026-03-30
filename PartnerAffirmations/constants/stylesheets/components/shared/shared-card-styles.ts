import { colors, radius, shadows } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const sharedCardStyles = StyleSheet.create({
  mainCardContainer: {
    display: "flex",
    width: "100%",
    height: "95%",

    backgroundColor: colors.card,
    borderRadius: radius.card,

    ...shadows.card,

    justifyContent: "center",
  },
  mainCardContent: {
    display: "flex",
    width: "95%",

    alignSelf: "center",
    justifyContent: "center",
  },
});
