import { Theme } from "@/constants/theme";
import { StyleSheet, TextStyle } from "react-native";

export const partnerInfoCardStyles = StyleSheet.create({
  infoCardContainer: {
    flex: 1,
  },
  infoCardContent: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  partnerNameText: {
    ...Theme.partnerText as TextStyle
  },
});
