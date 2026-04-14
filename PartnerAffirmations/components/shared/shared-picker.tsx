import { sharedPickerStyle } from "@/style/stylesheets/components/shared/shared-picker-style";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

type SharedPickerProps = {
  pickerValues: { label: string; value: string }[];
  selectedValue: string | undefined;
  onValueChange: (value: string) => void;
};

const SharedPicker = ({
  pickerValues,
  selectedValue,
  onValueChange,
}: SharedPickerProps) => {
  return (
    <>
      <View style={sharedPickerStyle.container}>
        <Picker
          style={sharedPickerStyle.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue: string) => onValueChange(itemValue)}
        >
          {pickerValues.map((p, index) => (
            <Picker.Item key={index} label={p.label} value={p.value} />
          ))}
        </Picker>
      </View>
    </>
  );
};
export default SharedPicker;
