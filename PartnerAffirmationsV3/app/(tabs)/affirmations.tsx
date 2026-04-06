import AffirmationHeader from "@/components/affirmations/affirmation-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AffirmationsModal from "../modals/affirmations-modal";
import UserCreatedAffirmationView from "@/components/affirmations/user-created-affirmation-view";
import { ModalMode } from "@/models/modal";

const AffirmationsScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [modalMode, setModalMode] = useState<ModalMode>(undefined);

  const onBackDrop = () => {
    setIsModalVisible(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const modalAction = () => {
    if (modalMode === "add") {
    } else if (modalMode === "edit") {
    } else if (modalMode === "delete") {
    }
  };

  return (
    <>
      <AffirmationsModal
        isVisible={isModalVisible}
        onBackDrop={onBackDrop}
        onClose={onModalClose}
        modalMode={modalMode}
      />

      <SafeAreaView style={safeAreaStyle.safeArea}>
        <AffirmationHeader />
        <UserCreatedAffirmationView />
      </SafeAreaView>
    </>
  );
};
export default AffirmationsScreen;
