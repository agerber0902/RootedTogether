import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const affirmationViewRowStyles = StyleSheet.create({
  subContainer: {
    display: "flex",

    flexDirection: "column",
  },
  userText: {
    color: Theme.colors.primary,
    fontStyle: "italic",
  },
  dateText: {
    color: Theme.colors.primary,
  },
  affirmation: {
    textAlign: "left",
  },
});
