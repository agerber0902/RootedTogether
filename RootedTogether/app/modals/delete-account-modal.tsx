import { ScrollView, Text, View } from "react-native";
import ModalView from "./modal-view";
import { deleteModalStyle } from "@/style/stylesheets/modals/delete-modal-style";
import CardButton from "@/components/shared/card-button";
import { useAuth } from "@/provider/auth-provider";
import { useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { deleteUserData } from "@/helpers/firebase-helper";

type DeleteAccountModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
};

const DeleteAccountModal = ({
  isVisible,
  onBackDrop,
  onClose,
}: DeleteAccountModalProps) => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        return undefined;
      }

      const isSignedOut = await deleteUserData(user);

      onClose();
      return isSignedOut;
    } catch {
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        
      }, 1000);
    }
  };

  return (
    <ModalView
      headerTitle={"Are you sure?"}
      isVisible={isVisible}
      onBackDrop={onBackDrop}
      onClose={onClose}
      error={""}
    >
      <ScrollView scrollEnabled={true} style={deleteModalStyle.scrollView}>
        <View style={deleteModalStyle.messageView}>
          <Text
            style={deleteModalStyle.message}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            Your account will be deleted forever. Click Delete to continue with
            delete.
          </Text>
        </View>
        <View style={deleteModalStyle.actions}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <View style={deleteModalStyle.actionWrapper}>
                <CardButton
                  title="Cancel"
                  isDisabled={false}
                  onPress={onClose}
                  isSecondary={true}
                />
              </View>
              <View style={deleteModalStyle.actionWrapper}>
                <CardButton
                  title={"Delete"}
                  onPress={() => onDelete()}
                  isDisabled={isLoading}
                  isDelete={true}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ModalView>
  );
};
export default DeleteAccountModal;
