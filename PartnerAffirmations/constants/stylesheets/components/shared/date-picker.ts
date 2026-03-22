import { StyleSheet } from "react-native";

export const datePickerStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",

    gap: 5,
    flexDirection: "row",
  },
  monthPicker: {
    width: '45%',
  },
  dayPicker: {
    width: '45%',
  },
});
