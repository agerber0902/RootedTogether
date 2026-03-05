import { sharedTextInputStyles } from "@/constants/stylesheets/components/shared/shared-text-input-styles";
import { TextInput, View } from "react-native";

type SharedTextInputProps = {
  value: string | undefined;
  placeHolder: string;
  onChangeText: (text: string) => void;
};

const SharedTextInput = ({
  value,
  placeHolder,
  onChangeText,
}: SharedTextInputProps) => {
  return (
    <View style={sharedTextInputStyles.textInputWrapper}>
      <TextInput
        value={value}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        style={!value ? sharedTextInputStyles.placeholderText : sharedTextInputStyles.textInput}
        maxLength={100}
      />
    </View>
  );
};
export default SharedTextInput;
