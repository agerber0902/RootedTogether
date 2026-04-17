import { deleteFriend, getFriends } from "@/helpers/friends-helper";
import { FriendDisplay } from "@/models/friends";
import { friendValueStyle } from "@/style/stylesheets/friends/friend-value-style";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import LoadingSpinner from "../shared/loading-spinner";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setFriendDisplays, setFriends } from "@/state/slices/friend-slice";

const iconSize = 20;

type EditableFriendValueProps = {
  friend: FriendDisplay;
  onEdit: (friendDisplay: FriendDisplay) => void;
};
const EditableFriendValue = ({
  friend,
  onEdit,
}: EditableFriendValueProps) => {

  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onEditPress = () => {
    setIsLoading(true);

    try {
      onEdit(friend);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const onDeletePress = async () => {
    setIsLoading(true);

    try {
      await deleteFriend(friend.friendId);

      const { friends, displays } = await getFriends(
              affirmationUser!.uid,
            );
      
            dispatch(setFriends(friends));
            dispatch(setFriendDisplays(displays));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <View style={friendValueStyle.container}>
      <View style={friendValueStyle.nameContainer}>
        <Text
          style={friendValueStyle.displayName}
          numberOfLines={1}
        >{`${friend.friendDisplayName}`}</Text>

        <Text style={friendValueStyle.name} numberOfLines={1}>
          {friend.friendName}
        </Text>
      </View>
      <View style={friendValueStyle.actionContainer}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Pressable onPress={onEditPress}>
              <Ionicons
                name="pencil"
                size={iconSize}
                color={friendValueStyle.actionIcon.color}
              />
            </Pressable>
            <Pressable onPress={onDeletePress}>
              <Ionicons
                name="trash"
                size={iconSize}
                color={friendValueStyle.actionIcon.color}
              />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};
export default EditableFriendValue;
