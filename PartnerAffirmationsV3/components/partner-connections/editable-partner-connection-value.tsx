import { PartnerConnectionDisplay } from "@/models/partner-connection";
import { partnerConnectionValueStyle } from "@/style/stylesheets/partner-connections/partner-connection-value-style";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const iconSize = 20;

type EditablePartnerConnectionValueProps = {
  connection: PartnerConnectionDisplay;
};
const EditablePartnerConnectionValue = ({
  connection,
}: EditablePartnerConnectionValueProps) => {
  return (
    <View style={partnerConnectionValueStyle.container}>
      <View style={partnerConnectionValueStyle.nameContainer}>
        <Text
          style={partnerConnectionValueStyle.displayName}
          numberOfLines={1}
        >{`${connection.partnerDisplayName}`}</Text>

        <Text style={partnerConnectionValueStyle.name} numberOfLines={1}>
          {connection.partnerName}
        </Text>
      </View>
      <View style={partnerConnectionValueStyle.actionContainer}>
        <Ionicons
          name="pencil"
          size={iconSize}
          color={partnerConnectionValueStyle.actionIcon.color}
        />
        <Ionicons
          name="trash"
          size={iconSize}
          color={partnerConnectionValueStyle.actionIcon.color}
        />
      </View>
    </View>
  );
};
export default EditablePartnerConnectionValue;
