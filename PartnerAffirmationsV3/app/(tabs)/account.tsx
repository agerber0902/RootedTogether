import AccountHeader from "@/components/account/account-header";
import DisplayCard from "@/components/shared/display-card";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountModal from "../modals/account-modal";
import { useState } from "react";
import { Text } from "react-native";

const AccountScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onBackDrop = () => {
    setIsModalVisible(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AccountModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        onBackDrop={onBackDrop}
      />
      <SafeAreaView style={safeAreaStyle.safeArea}>
        <AccountHeader />
        <DisplayCard>
          <Text />
        </DisplayCard>
      </SafeAreaView>
    </>
  );
};
export default AccountScreen;
