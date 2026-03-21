import Button from "@/components/shared/button";
import LoadingSpinner from "@/components/shared/loading-spinner";
import SharedTextInput from "@/components/shared/shared-text-input";
import {
  PartnerConnection,
  PartnerConnectionDisplay,
} from "@/constants/models/partnerConnection";
import { addEditPartnerModalStyles } from "@/constants/stylesheets/modals/add-edit-partner-modal-styles";
import { sharedModalStyles } from "@/constants/stylesheets/modals/shared-modal-styles";
import {
  addPartnerConnection,
  editPartnerConnection,
  getPartnerConnections,
} from "@/helpers/partner-helper";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setDisplayConnections, setPartnerConnections } from "@/state/slices/partner-connection";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

type AddPartnerFormProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  toggleViewState: (t: boolean) => void;
  connection?: PartnerConnectionDisplay;
};

const AddEditPartnerForm = ({
  isLoading,
  setIsLoading,
  toggleViewState,
  connection,
}: AddPartnerFormProps) => {
  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { partnerConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );

  const [displayName, setDisplayName] = useState<string>(
    connection?.partnerDisplayName ?? "",
  );
  const [email, setEmail] = useState<string>("");

  const isEdit: boolean = !!connection;

  const handleAddEdit = async () => {
    setIsLoading(true);
    try {
      if (isEdit) {
        const connectionToEdit = partnerConnections.find(
          (p) => p.id === connection?.connectionId,
        );

        if (!connectionToEdit) return;

        const updatedPartnerDetails = connectionToEdit.partnerDetails.map(
          (d) =>
            d.userId === connection?.partnerId ? { ...d, displayName } : d,
        );

        // create updated connection object
        const partnerConnection: PartnerConnection = {
          ...connectionToEdit,
          partnerDetails: updatedPartnerDetails,
        };

        await editPartnerConnection(partnerConnection);
      } else {
        await addPartnerConnection(affirmationUser!, email, displayName);
      }

      const {connections, displays } = await getPartnerConnections(affirmationUser!.uid);

      dispatch(setPartnerConnections(connections));
      dispatch(setDisplayConnections(displays));
      
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        toggleViewState(false);
      }, 1000);
    }
  };

  return (
    <>
      <View style={addEditPartnerModalStyles.form}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={sharedModalStyles.modalContainer}
        >
          <View style={addEditPartnerModalStyles.inputs}>
            <SharedTextInput
              value={displayName}
              onChangeText={(displayName: string) =>
                setDisplayName(displayName)
              }
              placeHolder="Partner Name"
            />
            {!isEdit && (
              <SharedTextInput
                placeHolder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            )}
          </View>

          {isLoading && <LoadingSpinner viewStyle={{ padding: 5 }} />}
          <View style={addEditPartnerModalStyles.actions}>
            <Button
              title={isLoading ? "Loading" : isEdit ? "Save" : "Add"}
              onPress={handleAddEdit}
              isDisabled={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
export default AddEditPartnerForm;
