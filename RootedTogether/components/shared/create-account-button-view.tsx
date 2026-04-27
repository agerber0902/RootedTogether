import { Text, View } from "react-native";
import CardButton from "./card-button";
import { useAuth } from "@/provider/auth-provider";
import { useState } from "react";
import LoginModal from "@/app/modals/login-modal";
import { createAccountButtonViewStyle } from "@/style/stylesheets/components/shared/create-account-button-view-style";

const CreateAccountButtonView = () => {
  const { isAuthenticated } = useAuth();

  const [isShowCreateModal, setIsShowCreateModal] = useState<boolean>(false);

  const onCreateAccount = () => {
    setIsShowCreateModal(true);
  };

  return (
    <>
      {isShowCreateModal && (
        <LoginModal
          isStartCreate={true}
          onClose={() => setIsShowCreateModal(false)}
        />
      )}
      <View style={createAccountButtonViewStyle.container}>
        <View style={createAccountButtonViewStyle.infoTextContainer}>
          <Text style={createAccountButtonViewStyle.infoText} numberOfLines={3} ellipsizeMode="tail">
            You need to create an account to view this information
          </Text>
        </View>
        <View style={createAccountButtonViewStyle.createButtonContainer}>
          <CardButton
            title="Create Account"
            isDisabled={isAuthenticated}
            onPress={onCreateAccount}
          />
        </View>
      </View>
    </>
  );
};
export default CreateAccountButtonView;
