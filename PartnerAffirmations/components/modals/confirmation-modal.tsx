import { View, ViewStyle } from "react-native";
import SharedModal from "../shared/modals/shared-modal";
import SharedText from "../shared/shared-text";
import { confirmationModalStyles } from "@/constants/stylesheets/modals/confirmation-modal-styles";
import Button from "../shared/button";
import LoadingSpinner from "../shared/loading-spinner";

type ConfirmationModalProps = {
  isVisible: boolean;
  isLoading: boolean;
  toggleVisibleState: () => void;
  text: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationModal = ({
  isVisible,
  isLoading,
  toggleVisibleState,
  text,
  confirmText,
  onCancel,
  onConfirm
}: ConfirmationModalProps) => {
  return (
    <>
      <SharedModal
        header="Are you sure?"
        isVisible={isVisible}
        onRequestClose={toggleVisibleState}
        onBackDropPress={toggleVisibleState}
        modalContent={
          <View style={confirmationModalStyles.content}>
            <SharedText style={confirmationModalStyles.text} numberOfLines={2} text={text} />
            
            {isLoading && <LoadingSpinner viewStyle={{}} />}

            <View style={confirmationModalStyles.actions}>
                <Button viewStyle={confirmationModalStyles.cancelButton as ViewStyle} textStyle={confirmationModalStyles.cancelButtonText} onPress={onCancel} title="Cancel" />
                <Button viewStyle={confirmationModalStyles.button} onPress={onConfirm} title={confirmText} />
            </View>

          </View>
        }
      />
    </>
  );
};
export default ConfirmationModal;
