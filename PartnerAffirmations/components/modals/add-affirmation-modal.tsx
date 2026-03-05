import SharedModal from "../shared/modals/shared-modal";
import AddAffirmationForm from "../affirmations/add-affirmation-form";
import { useState } from "react";

type AddAffirmationModalProps = {
  isVisible: boolean;
  toggleVisibleState: () => void;
};

const AddAffirmationModal = ({
  isVisible,
  toggleVisibleState,
}: AddAffirmationModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SharedModal
      isVisible={isVisible}
      header={"Add Affirmation"}
      onRequestClose={toggleVisibleState}
      onBackDropPress={isLoading ? undefined : toggleVisibleState}
      modalContent={
      <AddAffirmationForm isLoading={isLoading} setIsLoading={setIsLoading}/>
    }
    />
  );
};
export default AddAffirmationModal;
