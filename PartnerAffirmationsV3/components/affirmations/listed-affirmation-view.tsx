import { Affirmation } from "@/models/affirmation";
import { useAppSelector } from "@/state/hooks";
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
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { connectionDisplays } = useAppSelector(
    (state) => state.partnerConnection.value,
  );

  const getDisplayName = () => {
    if (affirmation.recipientId === affirmationUser?.uid) {
      return "You";
    }
    // Check connections
    return (
      connectionDisplays.find((dc) => dc.partnerId === affirmation.recipientId)
        ?.partnerDisplayName ?? ""
    );
  };

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
            {affirmation?.message}
          </Text>
          <Text
            style={listedAffirmationViewStyle.recipientText}
            key={`sub-${affirmation.id}`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {getDisplayName()}
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
