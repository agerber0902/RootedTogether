import { modalStyle } from "@/style/stylesheets/modals/modal-style";
import { View } from "react-native";
import Modal from "react-native-modal";

type ModalViewProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalView = ({ children, isVisible, onBackDrop, onClose }: ModalViewProps) => {
  
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
            {children}
        </View>
      </Modal>
    </>
  );
};
export default ModalView;
