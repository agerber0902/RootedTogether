import { addAffirmationModalStyles } from "@/constants/stylesheets/modals/add-affirmation-modal-styles";
import { sharedModalStyles } from "@/constants/stylesheets/modals/shared-modal-styles";
import { Theme } from "@/constants/theme";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import Button from "../shared/button";
import LoadingSpinner from "../shared/loading-spinner";
import { addAffirmation, getUserCreatedAffirmations } from "@/helpers/affirmation-helper";
import { useAuth } from "@/providers/auth-provider";
import SharedTextInput from "../shared/shared-text-input";
import { useAppDispatch } from "@/state/hooks";
import { setUserCreatedAffirmations } from "@/state/slices/affirmation";

type AddAffirmationFormProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AddAffirmationForm = ({
  isLoading,
  setIsLoading,
}: AddAffirmationFormProps) => {

  const { user } = useAuth();

  const [message, setMessage] = useState<string | undefined>(undefined);

  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    //TODO: Validate input
    if (message === undefined) {
      return;
    }

    try {
      setIsLoading(true);

      // Add to data base
      await addAffirmation({message, displayDate: null, recipientId: user!.uid, creatorId: user!.uid});

      // Refetch the list
      dispatch(setUserCreatedAffirmations(await getUserCreatedAffirmations(user!.uid)));

      setMessage(''); // reset input
    } catch (error) {
      console.error("Failed to add affirmation:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
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
          <SharedTextInput value ={message} onChangeText={(message: string) => setMessage(message)} placeHolder="Enter Affirmation" />
        </View>
        
        {isLoading && <LoadingSpinner viewStyle={{padding: 5}} />}
        <View style={addAffirmationModalStyles.actions}>
          <Button
            title={isLoading ? "Loading" : "Add"}
            onPress={handleAdd}
            isDisabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default AddAffirmationForm;
