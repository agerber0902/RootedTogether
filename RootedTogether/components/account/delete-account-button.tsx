import DeleteAccountModal from "@/app/modals/delete-account-modal";
import CardButton from "../shared/card-button";
import { useAuth } from "@/provider/auth-provider";
import { deleteUser } from "@firebase/auth";
import { useState } from "react";

const DeleteAccountButton = () => {
  const { user } = useAuth();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  
  const handleDelete = async () => {
    if (!user) {
      return undefined;
    }

    setIsDeleteModalVisible(true);
  };

  return (
    <>
      <DeleteAccountModal 
      isVisible={isDeleteModalVisible}
      onClose={() => setIsDeleteModalVisible(false)}
      onBackDrop={() => setIsDeleteModalVisible(false)}
      />
      <CardButton
        title="Delete Account"
        isDisabled={false}
        onPress={handleDelete}
        isDelete={true}
      />
    </>
  );
};
export default DeleteAccountButton;
