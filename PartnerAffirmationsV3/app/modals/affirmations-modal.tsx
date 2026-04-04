import { Text } from "react-native";
import ModalView from "./modal-view";

type AffirmationsModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
};

const AffirmationsModal = ({
  isVisible,
  onBackDrop,
  onClose,
}: AffirmationsModalProps) => {
  return (
    <>
      <ModalView
        headerTitle="Affirmations"
        isVisible={isVisible}
        onBackDrop={onBackDrop}
        onClose={onClose}
      >
        <Text>Affirmation Modal</Text>
      </ModalView>
    </>
  );
};
export default AffirmationsModal;
