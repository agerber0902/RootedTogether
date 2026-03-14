import { Theme } from "@/constants/theme";
import { StyleSheet, TextStyle } from "react-native";

export const partnerInfoTextStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    width: '100%',

    flexDirection: 'column',
    
  },
  partnerDisplayName: {
    ...(Theme.partnerNameText as TextStyle),

    textAlign: 'left',
  },
  partnerFullName: {
    ...(Theme.partnerDisplayNameText as TextStyle),

    textAlign: 'left',
  },
});
