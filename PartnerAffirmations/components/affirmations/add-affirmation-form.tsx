import { addAffirmationModalStyles } from "@/constants/stylesheets/modals/add-affirmation-modal-styles";
import { sharedModalStyles } from "@/constants/stylesheets/modals/shared-modal-styles";
import { Theme } from "@/constants/theme";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import Button from "../shared/button";
import LoadingSpinner from "../shared/loading-spinner";
import { addAffirmation } from "@/helpers/affirmation-helper";
import { useAuth } from "@/providers/auth-provider";
import SharedTextInput from "../shared/shared-text-input";

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

  const handleAdd = async () => {
    //TODO: Validate input
    if (message === undefined) {
      return;
    }

    try {
      setIsLoading(true);

      // Add to data base
      addAffirmation({message, recipientId: user!.uid, creatorId: user!.uid});
      setMessage(undefined); // reset input
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
        
        {isLoading && <LoadingSpinner viewStyle={{}} />}
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
