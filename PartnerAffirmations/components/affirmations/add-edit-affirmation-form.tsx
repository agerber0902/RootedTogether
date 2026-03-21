import { addAffirmationModalStyles } from "@/constants/stylesheets/modals/add-affirmation-modal-styles";
import { sharedModalStyles } from "@/constants/stylesheets/modals/shared-modal-styles";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import Button from "../shared/button";
import LoadingSpinner from "../shared/loading-spinner";
import {
  addAffirmation,
  editAffirmation,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import { useAuth } from "@/providers/auth-provider";
import SharedTextInput from "../shared/shared-text-input";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setUserCreatedAffirmations } from "@/state/slices/affirmation";
import SharedPicker from "../shared/shared-picker";

type AddOrEditAffirmationFormProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  toggleViewState: (t: boolean) => void;
};

const AddOrEditAffirmationForm = ({
  isLoading,
  setIsLoading,
  toggleViewState,
}: AddOrEditAffirmationFormProps) => {
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  const { affirmationToEditOrDelete } = useAppSelector(
    (state) => state.affirmation.value,
  );
  const { displayConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );

  const [message, setMessage] = useState<string | undefined>(
    affirmationToEditOrDelete?.message,
  );
  const [recipientId, setRecipientId] = useState<string | undefined>(
    affirmationToEditOrDelete?.recipientId,
  );

  const isEdit: boolean = affirmationToEditOrDelete !== undefined;

  const recipientPickerValues = [
    // { label: "-- Choose Recipient --", value: user!.uid },
    { label: "Personal", value: user!.uid },
    ...displayConnections.map((c) => {
      return { label: c.partnerDisplayName, value: c.partnerId };
    }),
  ];

  const handleAdd = async () => {
    //TODO: Validate input
    if (message === undefined) {
      return;
    }

    try {
      setIsLoading(true);

      if (isEdit && affirmationToEditOrDelete) {
        const affirmation = { ...affirmationToEditOrDelete };
        affirmation.message = message;
        affirmation.recipientId = recipientId ?? affirmation.recipientId
        await editAffirmation(affirmation);
      } else {
        // Add to data base
        await addAffirmation({
          message,
          displayDate: null,
          recipientId: recipientId ?? user!.uid,
          creatorId: user!.uid,
        });
      }

      // Refetch the list
      dispatch(
        setUserCreatedAffirmations(await getUserCreatedAffirmations(user!.uid)),
      );

      setMessage(""); // reset input
      setRecipientId(undefined);
      
    } catch (error) {
      console.error("Failed to add affirmation:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        toggleViewState(false);
      }, 1000);
    }
  };

  return (
    <View style={addAffirmationModalStyles.form}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={sharedModalStyles.modalContainer}
      >
        <View style={addAffirmationModalStyles.inputs}>
          <SharedTextInput
            value={message}
            onChangeText={(message: string) => setMessage(message)}
            placeHolder="Enter Affirmation"
          />

          <SharedPicker
            pickerValues={recipientPickerValues}
            selectedValue={recipientId}
            onValueChange={setRecipientId}
          />
        </View>

        {isLoading && <LoadingSpinner viewStyle={{ padding: 5 }} />}
        <View style={addAffirmationModalStyles.actions}>
          <Button
            title={isLoading ? "Loading" : isEdit ? "Save" : "Add"}
            onPress={handleAdd}
            isDisabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default AddOrEditAffirmationForm;
