import { editableAccountValueStyle } from "@/style/stylesheets/account/editable-account-value-style";
import { Text, View } from "react-native";

type EditableAccountValueProps = {
    title: string,
    value: string,
};

const EditableAccountValue = ({title, value} : EditableAccountValueProps) => {
    return (<>
    <View style={editableAccountValueStyle.container}>
        <Text style={editableAccountValueStyle.title} numberOfLines={1}>{`${title}: `}</Text>
        <Text style={editableAccountValueStyle.value} numberOfLines={1}>{value}</Text>
    </View>
    </>);
};
export default EditableAccountValue;