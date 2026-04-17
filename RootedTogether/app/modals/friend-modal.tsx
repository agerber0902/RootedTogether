import { TextInput, TextInputChangeEvent, View } from "react-native";
import ModalView from "./modal-view";
import CardButton from "@/components/shared/card-button";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { friendModalStyle } from "@/style/stylesheets/modals/friend-modal.style";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  InvitedFriend,
  FriendDisplay
} from "@/models/friends";
import { addFriend, editFriend, getFriends } from "@/helpers/friends-helper";
import { setFriendDisplays, setFriends } from "@/state/slices/friend-slice";

type FriendModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
  friend?: FriendDisplay;
  setFriend: (friend: FriendDisplay | undefined) => void;
};

const FriendModal = ({
  isVisible,
  onBackDrop,
  onClose,
  friend,
  setFriend,
}: FriendModalProps) => {
  const dispatch = useAppDispatch();
  const { friends } = useAppSelector(
    (state) => state.friend.value,
  );

  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const [displayName, setDisplayName] = useState<string>(
    friend?.friendDisplayName ?? "",
  );
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!isVisible) return;

    setDisplayName(friend?.friendDisplayName ?? "");
    setEmail("");
    setError(undefined);
  }, [friend, isVisible]);

  const resetInput = (): void => {
    setDisplayName("");
    setEmail("");
    setIsLoading(false);
    setError(undefined);
  };

  const onCancel = (): void => {
    resetInput();
    onClose();
  };

  const onSave = async (): Promise<void> => {
    let hasSaveError = false;

    setError(undefined);
    setIsLoading(true);
    try {
      if (friend) {
        const friendToEdit = friends.find(
          (p) => p.id === friend?.friendId,
        );

        if (!friendToEdit) return;

        const updatedDetails = friendToEdit.friendDetails.map(
          (d) =>
            d.userId === friend?.friendId ? { ...d, displayName } : d,
        );

        // create updated friend object
        const invitedFriend: InvitedFriend = {
          ...friendToEdit,
          friendDetails: updatedDetails,
        };

        const response = await editFriend(invitedFriend);
        if (response.error) {
          hasSaveError = true;
          setError(response.error);
        }
      } else {
        const response = await addFriend(
          affirmationUser!,
          email,
          displayName,
        );
        if (response.error) {
          hasSaveError = true;
          setError(response.error);
        }
      }

      const friendValues = await getFriends(
        affirmationUser!.uid,
      );

      dispatch(setFriends(friendValues.friends));
      dispatch(setFriendDisplays(friendValues.displays));
    } catch {
      hasSaveError = true;
      setError("Unable to save friend.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);

        // close modal
        if (!hasSaveError) {
          resetInput();

          // Reset friend to edit
          setFriend(undefined);
          onClose();
        }
      }, 1000);
    }
  };

  return (
    <>
      <ModalView
        headerTitle={friend ? "Edit Friend" : "Add Friend"}
        isVisible={isVisible}
        onBackDrop={onBackDrop}
        onClose={onClose}
        error={error}
      >
        <View style={friendModalStyle.container}>
          {/* Login Inputs */}
          <View style={friendModalStyle.inputs}>
            <TextInput
              key={"displayName"}
              numberOfLines={1}
              style={friendModalStyle.editableInput}
              placeholder={`Name`}
              value={displayName}
              onChange={(e: TextInputChangeEvent) =>
                setDisplayName(e.nativeEvent.text)
              }
            />
            {!friend && (
              <TextInput
                key={"email"}
                keyboardType={"email-address"}
                autoCapitalize="none"
                numberOfLines={1}
                style={friendModalStyle.editableInput}
                placeholder={`Email`}
                value={email}
                onChange={(e: TextInputChangeEvent) =>
                  setEmail(e.nativeEvent.text)
                }
              />
            )}
          </View>

          {/* Action Buttons */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <View style={friendModalStyle.actions}>
              <View style={friendModalStyle.actionWrapper}>
                <CardButton
                  title="Cancel"
                  onPress={onCancel}
                  isDisabled={isLoading}
                  isSecondary={true}
                />
              </View>
              <View style={friendModalStyle.actionWrapper}>
                <CardButton
                  title={friend ? "Save" : "Add"}
                  onPress={onSave}
                  isDisabled={isLoading}
                />
              </View>
            </View>
          )}
        </View>
      </ModalView>
    </>
  );
};
export default FriendModal;
