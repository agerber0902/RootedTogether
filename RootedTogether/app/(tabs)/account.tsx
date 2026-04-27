import AccountHeader from "@/components/account/account-header";
import { safeAreaStyle } from "@/style/stylesheets/pages/safe-area-style";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountModal from "../modals/account-modal";
import { useState } from "react";
import AccountInfoCard from "@/components/account/account-info-card";
import { View } from "react-native";
import { useAuth } from "@/provider/auth-provider";
import LoginModal from "../modals/login-modal";

const AccountScreen = () => {
  const safeAreaStyles = safeAreaStyle("account");
  const { isAuthenticated } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onBackDrop = () => {
    setIsModalVisible(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // if (!isAuthenticated) {
  //   return <LoginModal />;
  // }

  return (
    <>
      <AccountModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        onBackDrop={onBackDrop}
      />
      <SafeAreaView style={safeAreaStyles.safeArea}>
        <View style={safeAreaStyles.headerContainer}>
          <AccountHeader isEditMode={isEditMode} />
        </View>
        <View style={safeAreaStyles.contentContainer}>
          <AccountInfoCard setIsEditMode={setIsEditMode} />
        </View>
      </SafeAreaView>
    </>
  );
};
export default AccountScreen;
