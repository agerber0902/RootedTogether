import { ScrollView, View, Text } from "react-native";
import CardButton from "../shared/card-button";
import { friendViewStyle } from "@/style/stylesheets/friends/friend-view-style";
import { FriendDisplay } from "@/models/friends";
import EmptyListWarning from "../shared/empty-list-warning";
import FriendModal from "@/app/modals/friend-modal";
import { useState } from "react";
import { useAppSelector } from "@/state/hooks";
import EditableFriendValue from "./editable-friend-value";

const FriendsView = () => {

  const { friendDisplays } = useAppSelector((state) => state.friend.value);

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [friendToEdit, setFriendToEdit] = useState<FriendDisplay | undefined>(undefined);

  const onEdit = (friend: FriendDisplay) => {
    setFriendToEdit(friend);
    setModalIsVisible(true);
  }

  const onCreate = () => {
    setFriendToEdit(undefined);
    setModalIsVisible(true);
  }

  return (
    <>
      <FriendModal
        friend={friendToEdit}
        setFriend={setFriendToEdit}
        isVisible={modalIsVisible}
        onBackDrop={() => setModalIsVisible(false)}
        onClose={() => setModalIsVisible(false)}
      />

      <View style={friendViewStyle.container}>
        {/* Header */}
        <Text
          style={friendViewStyle.headerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Friends
        </Text>

        <ScrollView scrollEnabled={true}>
          {!friendDisplays || friendDisplays.length <= 0 ? (
            <EmptyListWarning text="You do not have any friends yet, create as many as you like." />
          ) : (
            friendDisplays.map((friend: FriendDisplay) => {
              return (
                <EditableFriendValue
                  key={friend.friendId}
                  friend={friend}
                  onEdit={onEdit}
                />
              );
            })
          )}
        </ScrollView>

        {/* Create Button */}
        <View style={friendViewStyle.actions}>
          <CardButton
            key={"create-friend"}
            title={"Create Friend"}
            onPress={onCreate}
            isDisabled={false}
          />
        </View>
      </View>
    </>
  );
};
export default FriendsView;
