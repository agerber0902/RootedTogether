import DeleteAccountModal from "@/app/modals/delete-account-modal";
import CardButton from "../shared/card-button";
import { useAuth } from "@/provider/auth-provider";
import { useState } from "react";

type DeleteAccountButtonProps = {
  onClick: () => void;
};

const DeleteAccountButton = ({onClick}: DeleteAccountButtonProps) => {
  const { user } = useAuth();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  
  const handleDelete = async () => {
    if (!user) {
      return undefined;
    }

    setIsDeleteModalVisible(true);
  };

  const onClose = () => {
    setIsDeleteModalVisible(false);
    onClick();
  }

  return (
    <>
      <DeleteAccountModal 
      isVisible={isDeleteModalVisible}
      onClose={onClose}
      onBackDrop={onClose}
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
