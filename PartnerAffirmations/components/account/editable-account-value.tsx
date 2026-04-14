import { editableAccountValueStyle } from "@/style/stylesheets/account/editable-account-value-style";
import { Text, TextInput, TextInputChangeEvent, View } from "react-native";

type EditableAccountValueProps = {
  title: string;
  value: string;
  setValue: (value: string) => void;
  isEdit: boolean;
};

const EditableAccountValue = ({
  title,
  value,
  setValue,
  isEdit,
}: EditableAccountValueProps) => {
  return (
    <>
      <View style={editableAccountValueStyle.container}>
        <Text
          style={editableAccountValueStyle.title}
          numberOfLines={1}
        >{`${title}: `}</Text>

        {isEdit ? (
          <TextInput
            numberOfLines={1}
            style={editableAccountValueStyle.editableInput}
            placeholder={`Enter ${title}`}
            value={value}
            onChange={(e: TextInputChangeEvent) =>
              setValue(e.nativeEvent.text)
            }
          ></TextInput>
        ) : (
          <Text style={editableAccountValueStyle.value} numberOfLines={1}>
            {value}
          </Text>
        )}
      </View>
    </>
  );
};
export default EditableAccountValue;
