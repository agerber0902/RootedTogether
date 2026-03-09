import SharedModal from "../shared/modals/shared-modal";
import AddOrEditAffirmationForm from "../affirmations/add-edit-affirmation-form";
import { SetStateAction, useState, Dispatch } from "react";

type AddAffirmationModalProps = {
  isVisible: boolean;
  toggleVisibleState: Dispatch<SetStateAction<boolean>>;
};

const AddorEditAffirmationModal = ({
  isVisible,
  toggleVisibleState,
}: AddAffirmationModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SharedModal
      isVisible={isVisible}
      header={"Add Affirmation"}
      onRequestClose={() => toggleVisibleState(false)}
      onBackDropPress={isLoading ? undefined : () => toggleVisibleState(false)}
      modalContent={
      <AddOrEditAffirmationForm isLoading={isLoading} setIsLoading={setIsLoading} toggleViewState={toggleVisibleState}/>
    }
    />
  );
};
export default AddorEditAffirmationModal;
