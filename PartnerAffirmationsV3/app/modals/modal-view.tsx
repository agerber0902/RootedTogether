import { modalStyle } from "@/style/stylesheets/modals/modal-style";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

type ModalViewProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
  children: React.ReactNode;

  headerTitle: string;
  error: string | undefined;
};

const ModalView = ({
  children,
  isVisible,
  onBackDrop,
  onClose,

  headerTitle,
  error,
}: ModalViewProps) => {
  const onBackDropPress = () => {
    onBackDrop();
  };

  const onClosePress = () => {
    onClose();
  };

  return (
    <>
      <Modal
        style={modalStyle.modal}
        animationIn="fadeIn"
        isVisible={isVisible}
        avoidKeyboard={true}
        hasBackdrop={true}
        onBackdropPress={onBackDropPress}
        onBackButtonPress={onClosePress}
      >
        <View style={modalStyle.modalContent}>
          {/* Header */}
          <Text
            style={modalStyle.headerText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {headerTitle}
          </Text>

          {/* Children */}
          {children}

          {/* Error Message */}
          {error && (
            <Text
              style={modalStyle.error}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {error}
            </Text>
          )}
        </View>
      </Modal>
    </>
  );
};
export default ModalView;
