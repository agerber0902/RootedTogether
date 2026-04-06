import { ModalMode } from "@/models/modal";
import ModalView from "./modal-view";
import AddEditAffirmationModalForm from "@/components/affirmations/add-edit-affirmation-modal-form";
import DeleteAffirmationModalForm from "@/components/affirmations/delete-affirmation-modal";

type AffirmationsModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
  modalMode: ModalMode;
};

const AffirmationsModal = ({
  isVisible,
  onBackDrop,
  onClose,
  modalMode,
}: AffirmationsModalProps) => {
  return (
    <>
      <ModalView
        headerTitle={
          modalMode === "add"
            ? "Add Affirmation"
            : modalMode === "edit"
              ? "Edit Affirmation"
              : modalMode === "delete"
                ? "Delete Affirmation"
                : "Affirmations"
        }
        isVisible={isVisible}
        onBackDrop={onBackDrop}
        onClose={onClose}
      >
        {modalMode === 'add' && <AddEditAffirmationModalForm />}
        {modalMode === 'edit' && <AddEditAffirmationModalForm />}
        {modalMode === 'delete' && <DeleteAffirmationModalForm/>}
      </ModalView>
    </>
  );
};
export default AffirmationsModal;
