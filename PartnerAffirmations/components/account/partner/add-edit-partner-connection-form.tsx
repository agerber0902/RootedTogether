import Button from "@/components/shared/button";
import LoadingSpinner from "@/components/shared/loading-spinner";
import SharedTextInput from "@/components/shared/shared-text-input";
import { PartnerConnection } from "@/constants/models/partnerConnection";
import { addEditPartnerModalStyles } from "@/constants/stylesheets/modals/add-edit-partner-modal-styles";
import { sharedModalStyles } from "@/constants/stylesheets/modals/shared-modal-styles";
import {
  addPartnerConnection,
  editPartnerConnection,
  getPartnerConnections,
} from "@/helpers/partner-helper";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setPartnerConnections } from "@/state/slices/partner-connection";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

type AddPartnerFormProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  toggleViewState: (t: boolean) => void;
  connection?: PartnerConnection;
};

const AddEditPartnerForm = ({
  isLoading,
  setIsLoading,
  toggleViewState,
  connection,
}: AddPartnerFormProps) => {
  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const [displayName, setDisplayName] = useState<string>(
    connection?.connectionCreatorDisplayName ?? "",
  );
  const [email, setEmail] = useState<string>("");

  const isEdit: boolean = !!connection;

  const handleAddEdit = async () => {
    setIsLoading(true);
    try {
      if (isEdit) {
        const partnerConnection: PartnerConnection = { ...connection! };
        partnerConnection.connectionCreatorDisplayName = displayName;
        await editPartnerConnection(partnerConnection);
      } else {
        await addPartnerConnection(affirmationUser!, email, displayName);
      }

      dispatch(
        setPartnerConnections(
          await getPartnerConnections(affirmationUser!.uid),
        ),
      );
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
