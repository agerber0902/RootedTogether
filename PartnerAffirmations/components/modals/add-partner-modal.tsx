import { Dispatch, SetStateAction, useState } from "react";
import SharedModal from "../shared/modals/shared-modal";
import AddEditPartnerForm from "../account/partner/add-edit-partner-connection-form";
import { PartnerConnection } from "@/constants/models/partnerConnection";

type AddPartnerModalProps = {
  isVisible: boolean;
  toggleVisibleState: Dispatch<SetStateAction<boolean>>;
  connection?: PartnerConnection | undefined;
};
const AddPartnerModal = ({
  isVisible,
  toggleVisibleState,
  connection
}: AddPartnerModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
//TODO: validate input
  return (
    <>
      <SharedModal
        isVisible={isVisible}
        header={"Add Partner"}
        onRequestClose={() => toggleVisibleState(false)}
        onBackDropPress={
          isLoading ? undefined : () => toggleVisibleState(false)
        }
        modalContent={
          <AddEditPartnerForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            toggleViewState={toggleVisibleState}
            connection={connection}
          />
        }
      />
    </>
  );
};
export default AddPartnerModal;
