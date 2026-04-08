import { editableAccountValueStyle } from "@/style/stylesheets/account/editable-account-value-style";
import { useState } from "react";
import { Text, TextInput, TextInputChangeEvent, View } from "react-native";

type EditableAccountValueProps = {
  title: string;
  value: string;
  isEdit: boolean;
};

const EditableAccountValue = ({
  title,
  value,
  isEdit,
}: EditableAccountValueProps) => {
  const [editableValue, setEditableValue] = useState<string | undefined>(value);

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
            value={editableValue}
            onChange={(e: TextInputChangeEvent) =>
              setEditableValue(e.nativeEvent.text)
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
