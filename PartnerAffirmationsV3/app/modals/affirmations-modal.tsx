import ModalView from "./modal-view";
import { Affirmation } from "@/models/affirmation";
import { useState, useEffect } from "react";
import { TextInput, TextInputChangeEvent, View } from "react-native";
import { affirmationModalStyle } from "@/style/stylesheets/modals/affirmation-modal-style";
import LoadingSpinner from "@/components/shared/loading-spinner";
import CardButton from "@/components/shared/card-button";
import DatePicker from "@/components/shared/date-picker";
import SharedSwitch from "@/components/shared/shared-switch";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import SharedPicker from "../../components/shared/shared-picker";
import {
  addAffirmation,
  editAffirmation,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import { Timestamp } from "firebase/firestore";
import { setUserCreatedAffirmations } from "@/state/slices/affirmation-slice";

type AffirmationsModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
  affirmation?: Affirmation;
  setAffirmation: (affirmation: Affirmation | undefined) => void;
};

const AffirmationsModal = ({
  isVisible,
  onBackDrop,
  onClose,
  affirmation,
  setAffirmation,
}: AffirmationsModalProps) => {
  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { connectionDisplays } = useAppSelector(
    (state) => state.partnerConnection.value,
  );

  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>(affirmation?.message ?? "");
  const [isSetDate, setIsSetDate] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(affirmation?.displayDate?.toDate());
  const [isSetRecipient, setIsSetRecipient] = useState<boolean>(false);
  const [recipientId, setRecipientId] = useState<string | undefined>(
    affirmation?.recipientId,
  );

  const recipientPickerValues = [
    // { label: "-- Choose Recipient --", value: affirmationUser!.uid },
    { label: "Personal", value: affirmationUser!.uid },
    ...connectionDisplays.map((c) => {
      return { label: c.partnerDisplayName, value: c.partnerId };
    }),
  ];

  const resetInput = () => {
    setError(undefined);
    setMessage("");
    setSelectedDate(undefined);
    setIsSetDate(false);
    setIsLoading(false);
    setIsSetRecipient(false);
    setRecipientId(undefined);
  };

  // Sync modal state when affirmation prop changes
  useEffect(() => {
    if (affirmation) {
      setMessage(affirmation.message);
      // setRecipientId(affirmation.recipientId);
      // setIsSetRecipient(true);
      // Keep other fields at their reset state for new edits
    }
  }, [affirmation]);

  const onToggleSetDate = (value: boolean) => {
    setIsSetDate(value);

    // Ensure a date is available even if the user opens date selection but does not change pickers.
    if (value && !selectedDate) {
      setSelectedDate(new Date());
    }
  };

  const onToggleSetRecipient = (value: boolean) => {
    setIsSetRecipient(value);

    // Ensure a recipient is available even if the user opens recipient selection but does not change pickers.
    if (value && !recipientId) {
      setRecipientId(affirmationUser!.uid);
    }
  }

  const onSave = async (): Promise<void> => {
    let hasSaveError = false;

    setError(undefined);
    setIsLoading(true);
    try {
      // Validate input
      if (message === undefined) {
        setError("Message is empty");
        hasSaveError = true;
        return;
      }

      if (affirmation) {
        const affirmationToEdit = { ...affirmation };
        affirmationToEdit.message = message;
        affirmationToEdit.recipientId = recipientId ?? affirmation.recipientId;
        affirmationToEdit.displayDate = isSetDate
          ? selectedDate
            ? Timestamp.fromDate(selectedDate)
            : null
          : affirmation.displayDate;

        await editAffirmation(affirmationToEdit);
      } else {
        // Add to data base
        await addAffirmation({
          message,
          displayDate: isSetDate
            ? selectedDate
              ? Timestamp.fromDate(selectedDate)
              : null
            : null,
          recipientId: recipientId ?? affirmationUser!.uid,
          creatorId: affirmationUser!.uid,
          createdAt: Timestamp.fromDate(new Date()),
        });
      }

      // update user created affitmations
      dispatch(
        setUserCreatedAffirmations(
          await getUserCreatedAffirmations(affirmationUser!.uid),
        ),
      );
    } catch {
      hasSaveError = true;
      setError("Unable to save partner connection.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);

        // close modal
        if (!hasSaveError) {
          resetInput();

          // Reset connection to edit
          setAffirmation(undefined);
          onClose();
        }
      }, 1000);
    }
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

          <View style={affirmationModalStyle.dateContainer}>
            <View style={affirmationModalStyle.switchContainer}>
              <SharedSwitch text={affirmation ? 'Edit Date' : 'Add Date'} onPress={onToggleSetDate} />
            </View>

            {isSetDate && (
              <View style={affirmationModalStyle.dateContainer}>
                <DatePicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </View>
            )}
          </View>

          <View style={affirmationModalStyle.recipientPickerContainer}>
            <View style={affirmationModalStyle.switchContainer}>
              <SharedSwitch text={affirmation ? 'Edit Recipient' : 'Add Recipient'} onPress={onToggleSetRecipient} />
            </View>
            {isSetRecipient && <SharedPicker
              pickerValues={recipientPickerValues}
              selectedValue={recipientId}
              onValueChange={setRecipientId}
            />}
          </View>
        </View>

        <View style={affirmationModalStyle.actions}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <CardButton
              title={affirmation ? "Save" : "Add"}
              onPress={onSave}
              isDisabled={isLoading}
            />
          )}
        </View>
      </ModalView>
    </>
  );
};
export default AffirmationsModal;
