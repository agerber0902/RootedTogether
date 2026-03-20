import { sharedTextInputStyles } from "@/constants/stylesheets/components/shared/shared-text-input-styles";
import { KeyboardTypeOptions, TextInput, View } from "react-native";

type SharedTextInputProps = {
  value: string | undefined;
  placeHolder: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
};

const SharedTextInput = ({
  value,
  placeHolder,
  keyboardType,
  onChangeText,
}: SharedTextInputProps) => {
  return (
    <View style={sharedTextInputStyles.textInputWrapper}>
      <TextInput
        value={value}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={!value ? sharedTextInputStyles.placeholderText : sharedTextInputStyles.textInput}
        maxLength={100}
      />
    </View>
  );
};
export default SharedTextInput;
