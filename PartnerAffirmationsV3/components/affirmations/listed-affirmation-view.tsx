import { users } from "@/data/mock";
import { Affirmation } from "@/models/affirmation";
import {
  iconSize,
  listedAffirmationViewStyle,
} from "@/style/stylesheets/affirmations/listed-affirmation-view";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type ListedAffirmationViewProps = {
  affirmation: Affirmation;
};

const ListedAffirmationView = ({ affirmation }: ListedAffirmationViewProps) => {
  return (
    <>
      <View style={listedAffirmationViewStyle.container}>
        <View style={listedAffirmationViewStyle.messageContainer}>
          <Text
            style={listedAffirmationViewStyle.affirmationText}
            key={affirmation.id}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {affirmation.message}
          </Text>
          <Text
            style={listedAffirmationViewStyle.recipientText}
            key={`sub-${affirmation.id}`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {/* TODO: connect to Partner Name */}
            {users.find((u) => u.id === affirmation.recipientId)?.name}
          </Text>
        </View>
        <View style={listedAffirmationViewStyle.actionContainer}>
          <Ionicons
            name="pencil"
            size={iconSize}
            color={listedAffirmationViewStyle.actionIcon.color}
          />
          <Ionicons
            name="trash"
            size={iconSize}
            color={listedAffirmationViewStyle.actionIcon.color}
          />
        </View>
      </View>
    </>
  );
};
export default ListedAffirmationView;
