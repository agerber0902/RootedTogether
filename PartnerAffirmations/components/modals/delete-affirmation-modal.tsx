import {
  deleteAffirmation,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import ConfirmationModal from "./confirmation-modal";
import { setUserCreatedAffirmations } from "@/state/slices/affirmation";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch } from "@/state/hooks";

type DeleteAffirmationModalProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  affirmationToDeleteId: string;
};

const DeleteAffirmationModal = ({ showModal, setShowModal, affirmationToDeleteId } : DeleteAffirmationModalProps) => {
  const { user } = useAuth();

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onDelete = async () => {
    try {
      setIsDeleteLoading(true);

      await deleteAffirmation(affirmationToDeleteId);

      // update
      const createdAffirmations = await getUserCreatedAffirmations(
        user?.uid ?? "0",
      );

      dispatch(setUserCreatedAffirmations(createdAffirmations));
    } finally {
      //  Add delay to make it not so jumpy
      setTimeout(() => {
        setIsDeleteLoading(false);
        setShowModal(false);
      }, 1000);
    }
  };

  return (
    <ConfirmationModal
      isVisible={showModal}
      isLoading={isDeleteLoading}
      toggleVisibleState={() =>
        setShowModal(!showModal)
      }
      text="You are about to delete an affirmation."
      confirmText="Delete"
      onCancel={() => setShowModal(false)}
      onConfirm={() => onDelete()}
    />
  );
};
export default DeleteAffirmationModal;
