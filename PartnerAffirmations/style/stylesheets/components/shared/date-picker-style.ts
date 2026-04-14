import { StyleSheet } from "react-native";

export const datePickerStyle = StyleSheet.create({
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
