import { View } from "react-native";
import SharedPicker from "./shared-picker";
import { useState } from "react";
import { datePickerStyle } from "@/style/stylesheets/components/shared/date-picker-style";

type pickerOption = {
  label: string;
  value: string;
};

type DatePickerProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
};
const DatePicker = ({ selectedDate, setSelectedDate} : DatePickerProps) => {
  const months = [
    { label: "Jan", value: "1", maxMonthValue: 31 },
    { label: "Feb", value: "2", maxMonthValue: 29 },
    { label: "Mar", value: "3", maxMonthValue: 31 },
    { label: "Apr", value: "4", maxMonthValue: 30 },
    { label: "May", value: "5", maxMonthValue: 31 },
    { label: "Jun", value: "6", maxMonthValue: 30 },
    { label: "Jul", value: "7", maxMonthValue: 31 },
    { label: "Aug", value: "8", maxMonthValue: 31 },
    { label: "Sep", value: "9", maxMonthValue: 30 },
    { label: "Oct", value: "10", maxMonthValue: 31 },
    { label: "Nov", value: "11", maxMonthValue: 30 },
    { label: "Dec", value: "12", maxMonthValue: 31 },
  ];

  const initialDate = selectedDate ?? new Date();
  const currentMonth = months[initialDate.getMonth()];
  const [selectedMonth, setSelectedMonth] = useState<{
    label: string;
    value: string;
    maxMonthValue: number;
  }>(currentMonth);

  const days: pickerOption[] = Array.from(
    { length: selectedMonth.maxMonthValue },
    (_, i) => {
      return { label: `${i + 1}`, value: `${i + 1}` };
    },
  );
  const [selectedDay, setSelectedDay] = useState<string>(`${initialDate.getDate()}`);

  const setMonth = (value: string) => {
    const month = months.find((m) => m.value === value)!;
    setSelectedMonth(month);

    setDate(month.value, selectedDay);
  };

  const setDay = (value: string) => {
    setSelectedDay(value);

    setDate(selectedMonth.value, value);
  }

  const setDate = (month: string, day: string) => {
    const year = new Date().getFullYear();
    const date = new Date(year, parseInt(month)-1, parseInt(day))
    setSelectedDate(date);
  };

  return (
    <View style={datePickerStyle.container}>
      <View style={datePickerStyle.monthPicker}>
        <SharedPicker
          pickerValues={months}
          selectedValue={selectedMonth.value}
          onValueChange={(value: string) => setMonth(value)}
        />
      </View>

      <View style={datePickerStyle.dayPicker}>
        <SharedPicker
          pickerValues={days}
          selectedValue={selectedDay}
          onValueChange={setDay}
        />
      </View>
    </View>
  );
};
export default DatePicker;
