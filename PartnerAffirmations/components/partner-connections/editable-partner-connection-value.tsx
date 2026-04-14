import { deletePartnerConnection, getPartnerConnections } from "@/helpers/partner-connection-helper";
import { PartnerConnectionDisplay } from "@/models/partner-connection";
import { partnerConnectionValueStyle } from "@/style/stylesheets/partner-connections/partner-connection-value-style";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import LoadingSpinner from "../shared/loading-spinner";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setConnectionDisplays, setPartnerConnections } from "@/state/slices/patner-connection-slice";

const iconSize = 20;

type EditablePartnerConnectionValueProps = {
  connection: PartnerConnectionDisplay;
  onEdit: (connection: PartnerConnectionDisplay) => void;
};
const EditablePartnerConnectionValue = ({
  connection,
  onEdit,
}: EditablePartnerConnectionValueProps) => {

  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onEditPress = () => {
    setIsLoading(true);

    try {
      onEdit(connection);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const onDeletePress = async () => {
    setIsLoading(true);

    try {
      await deletePartnerConnection(connection.connectionId);

      const { connections, displays } = await getPartnerConnections(
              affirmationUser!.uid,
            );
      
            dispatch(setPartnerConnections(connections));
            dispatch(setConnectionDisplays(displays));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Pressable onPress={onEditPress}>
              <Ionicons
                name="pencil"
                size={iconSize}
                color={partnerConnectionValueStyle.actionIcon.color}
              />
            </Pressable>
            <Pressable onPress={onDeletePress}>
              <Ionicons
                name="trash"
                size={iconSize}
                color={partnerConnectionValueStyle.actionIcon.color}
              />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};
export default EditablePartnerConnectionValue;
