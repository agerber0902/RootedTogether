import ModalView from "./modal-view";
import { Affirmation } from "@/models/affirmation";
import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEvent,
  View,
} from "react-native";
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
import { setAnonymousUserCreatedAffirmations, setUserCreatedAffirmations } from "@/state/slices/affirmation-slice";
import { useAuth } from "@/provider/auth-provider";
import {
  saveToCachedAnonymousAffirmations,
  updateCachedAnonymousAffirmations,
} from "@/config/firebase";

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
  const { isAuthenticated } = useAuth();

  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { friendDisplays } = useAppSelector((state) => state.friend.value);

  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>(affirmation?.message ?? "");
  const [isSetDate, setIsSetDate] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    affirmation?.displayDate?.toDate(),
  );
  const [isSetRecipient, setIsSetRecipient] = useState<boolean>(false);
  const [recipientId, setRecipientId] = useState<string | undefined>(
    affirmation?.recipientId,
  );

  const recipientPickerValues = [
    // { label: "-- Choose Recipient --", value: affirmationUser!.uid },
    { label: "Personal", value: affirmationUser?.uid ?? "" },
    ...friendDisplays
      .filter((fd) => fd.isAccepted)
      .map((c) => {
        return { label: c.friendDisplayName, value: c.friendId };
      }),
  ];

  // Reset state when modal closes
  useEffect(() => {
    if (!isVisible) {
      setError(undefined);
      setMessage("");
      setSelectedDate(undefined);
      setIsSetDate(false);
      setIsLoading(false);
      setIsSetRecipient(false);
      setRecipientId(undefined);
      setAffirmation(undefined);
    }
  }, [isVisible, setAffirmation]);

  // Sync modal state when affirmation prop changes
  useEffect(() => {
    if (affirmation) {
      setMessage(affirmation.message);
      // setRecipientId(affirmation.recipientId);
      // Keep other fields at their reset state for new edits
    }
  }, [affirmation, isVisible]);

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
  };

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
        if (isAuthenticated) {
          await editAffirmation(affirmationToEdit);
        } else {
          // Update local async storage with affirmation
          const anonAffirmations = await updateCachedAnonymousAffirmations(affirmationToEdit);
          dispatch(setAnonymousUserCreatedAffirmations(anonAffirmations));
        }
      } else {
        // Add to data base
        if (isAuthenticated) {
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
        } else {
          // Add affirmation to local async storage
          const anonAffirmations = await saveToCachedAnonymousAffirmations({
            message: message,
            displayDate: null,
            recipientId: undefined,
            creatorId: undefined,
            createdAt: Timestamp.fromDate(new Date()),
          });
          dispatch(setAnonymousUserCreatedAffirmations(anonAffirmations));
        }
      }

      // update user created affitmations
      if (isAuthenticated) {
        dispatch(
          setUserCreatedAffirmations(
            await getUserCreatedAffirmations(affirmationUser!.uid),
          ),
        );
      }

    } catch {
      hasSaveError = true;
      setError("Unable to save affirmation.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);

        // close modal
        if (!hasSaveError) {
          // Reset friend to edit
          setAffirmation(undefined);
          onClose();
        }
      }, 1000);
    }
  };

  return (
    <>
      <ModalView
        headerTitle={affirmation ? "Edit Affirmation" : "Create an Affirmation"}
        isVisible={isVisible}
        onBackDrop={onBackDrop}
        onClose={onClose}
        error={error}
      >
        <ScrollView
          scrollEnabled={true}
          style={affirmationModalStyle.scrollView}
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
            {isAuthenticated && (
              <>
                <View style={affirmationModalStyle.dateContainer}>
                  <View style={affirmationModalStyle.switchContainer}>
                    <SharedSwitch
                      text={affirmation ? "Edit Date" : "Add Date"}
                      onPress={onToggleSetDate}
                    />
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
                    <SharedSwitch
                      text={affirmation ? "Edit Recipient" : "Add Recipient"}
                      onPress={onToggleSetRecipient}
                    />
                  </View>
                  {isSetRecipient && (
                    <SharedPicker
                      pickerValues={recipientPickerValues}
                      selectedValue={recipientId}
                      onValueChange={setRecipientId}
                    />
                  )}
                </View>
              </>
            )}
          </View>

          <View style={affirmationModalStyle.actions}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <CardButton
                  title={
                    affirmation ? "Save" : !isAuthenticated ? "Create" : "Share"
                  }
                  onPress={onSave}
                  isDisabled={isLoading}
                />
              </>
            )}
          </View>

          {!isAuthenticated && (
            <Text
              style={affirmationModalStyle.noteText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Once you create an account, you may add date and recipient to the
              affirmation.
            </Text>
          )}
        </ScrollView>
      </ModalView>
    </>
  );
};
export default AffirmationsModal;
