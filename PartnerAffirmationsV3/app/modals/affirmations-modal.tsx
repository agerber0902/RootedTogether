import { ModalMode } from "@/models/modal";
import ModalView from "./modal-view";
import AddEditAffirmationModalForm from "@/components/affirmations/add-edit-affirmation-modal-form";
import DeleteAffirmationModalForm from "@/components/affirmations/delete-affirmation-modal";
import { Affirmation } from "@/models/affirmation";
import { useState } from "react";
import { Text, TextInput, TextInputChangeEvent, View } from "react-native";
import { affirmationModalStyle } from "@/style/stylesheets/modals/affirmation-modal-style";
import LoadingSpinner from "@/components/shared/loading-spinner";
import CardButton from "@/components/shared/card-button";
import DatePicker from "@/components/shared/date-picker";
import SharedPicker from "@/components/shared/shared-picker";

type AffirmationsModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
  affirmation?: Affirmation;
};

const AffirmationsModal = ({
  isVisible,
  onBackDrop,
  onClose,
  affirmation,
}: AffirmationsModalProps) => {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [isSetDate, setIsSetDate] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const resetInput = () => {
    setError(undefined);
    setMessage("");
  };

  return (
    <>
      <ModalView
        headerTitle={affirmation ? "Edit Affirmation" : "Add Affirmation"}
        isVisible={isVisible}
        onBackDrop={onBackDrop}
        onClose={onClose}
        error={error}
      >
        <View style={affirmationModalStyle.inputs}>
          <TextInput
            key={"message"}
            numberOfLines={1}
            style={affirmationModalStyle.editableInput}
            placeholder={`Affirmation Message`}
            value={message}
            onChange={(e: TextInputChangeEvent) =>
              setMessage(e.nativeEvent.text)
            }
          />

          <View>
            <View style={{ paddingBottom: 5 }}>
              <SharedSwitch text="Add Date" onPress={onToggleSetDate} />
            </View>

            {isSetDate && (
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={affirmationModalStyle.subHeader}
                >
                  Affirmation Date:{" "}
                </Text>
                <DatePicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </View>
            )}
          </View>

          <View style={{ width: "100%" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={affirmationModalStyle.subHeader}
            >
              Affirmation Recipient:{" "}
            </Text>
            <SharedPicker
              pickerValues={recipientPickerValues}
              selectedValue={recipientId}
              onValueChange={setRecipientId}
            />
          </View>
        </View>

        <View style={affirmationModalStyle.actions}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <CardButton
              title={affirmation ? "Save" : "Add"}
              onPress={handleAdd}
              isDisabled={isLoading}
            />
          )}
        </View>
      </ModalView>
    </>
  );
};
export default AffirmationsModal;
