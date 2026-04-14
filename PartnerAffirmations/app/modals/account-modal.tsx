import { modalStyle } from "@/style/stylesheets/modals/modal-style";
import { Text } from "react-native";
import ModalView from "./modal-view";

type AccountModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
};

const AccountModal = ({
  isVisible,
  onBackDrop,
  onClose,
}: AccountModalProps) => {
  return (
    <>
      <ModalView
        headerTitle="Account"
        isVisible={isVisible}
        onBackDrop={onBackDrop}
        onClose={onClose}
        error={undefined}
      >
        <Text style={modalStyle.bodyText}>Account Modal</Text>
      </ModalView>
    </>
  );
};
export default AccountModal;
