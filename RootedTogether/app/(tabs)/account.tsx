import AccountHeader from "@/components/account/account-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountModal from "../modals/account-modal";
import { useState } from "react";
import AccountInfoCard from "@/components/account/account-info-card";
import { View } from "react-native";

const AccountScreen = () => {
  const safeAreaStyles = safeAreaStyle('account');

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
      <SafeAreaView style={safeAreaStyles.safeArea}>
        <View style={safeAreaStyles.headerContainer}>
          <AccountHeader />
        </View>
        <View style={safeAreaStyles.contentContainer}>
          <AccountInfoCard />
        </View>
      </SafeAreaView>
    </>
  );
};
export default AccountScreen;
