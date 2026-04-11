import { TextInput, TextInputChangeEvent, View } from "react-native";
import ModalView from "./modal-view";
import CardButton from "@/components/shared/card-button";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { partnerConnectionModalStyle } from "@/style/stylesheets/modals/partner-connection-modal.style";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  PartnerConnection,
  PartnerConnectionDisplay,
} from "@/models/partner-connection";
import {
  addPartnerConnection,
  editPartnerConnection,
  getPartnerConnections,
} from "@/helpers/partner-connection-helper";
import {
  setConnectionDisplays,
  setPartnerConnections,
} from "@/state/slices/patner-connection-slice";

type PartnerConnectionModalProps = {
  isVisible: boolean;
  onBackDrop: () => void;
  onClose: () => void;
  connection?: PartnerConnectionDisplay;
};

const PartnerConnectionModal = ({
  isVisible,
  onBackDrop,
  onClose,
  connection,
}: PartnerConnectionModalProps) => {
  const dispatch = useAppDispatch();
  const { partnerConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const resetInput = (): void => {
    setDisplayName("");
    setEmail("");
    setIsLoading(false);
    setError(undefined);
  };

  const onCancel = (): void => {
    resetInput();
    onClose();
  };

  const onSave = async (): Promise<void> => {
    resetInput();
    let hasSaveError = false;

    setIsLoading(true);
    try {
      if (connection) {
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

        const response = await editPartnerConnection(partnerConnection);
        if (response.error) {
          hasSaveError = true;
          setError(response.error);
        }
      } else {
        const response = await addPartnerConnection(
          affirmationUser!,
          email,
          displayName,
        );
        if (response.error) {
          hasSaveError = true;
          setError(response.error);
        }
      }

      const { connections, displays } = await getPartnerConnections(
        affirmationUser!.uid,
      );

      dispatch(setPartnerConnections(connections));
      dispatch(setConnectionDisplays(displays));
    } catch {
      hasSaveError = true;
      setError("Unable to save partner connection.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);

        // close modal
        if (!hasSaveError) {
          onClose();
        }
      }, 1000);
    }
  };

  return (
    <>
      <ModalView
        headerTitle={connection ? 'Edit Partner' : 'Add Partner'}
        isVisible={isVisible}
        onBackDrop={onBackDrop}
        onClose={onClose}
        error={error}
      >
        <View style={partnerConnectionModalStyle.container}>
          {/* Login Inputs */}
          <View style={partnerConnectionModalStyle.inputs}>
            <TextInput
              key={"displayName"}
              numberOfLines={1}
              style={partnerConnectionModalStyle.editableInput}
              placeholder={`Name`}
              value={displayName}
              onChange={(e: TextInputChangeEvent) =>
                setDisplayName(e.nativeEvent.text)
              }
            />
            <TextInput
              key={"email"}
              keyboardType={"email-address"}
              autoCapitalize="none"
              numberOfLines={1}
              style={partnerConnectionModalStyle.editableInput}
              placeholder={`Email`}
              value={email}
              onChange={(e: TextInputChangeEvent) =>
                setEmail(e.nativeEvent.text)
              }
            />
          </View>

          {/* Action Buttons */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <View style={partnerConnectionModalStyle.actions}>
              <View style={partnerConnectionModalStyle.actionWrapper}>
                <CardButton
                  title="Cancel"
                  onPress={onCancel}
                  isDisabled={isLoading}
                  isSecondary={true}
                />
              </View>
              <View style={partnerConnectionModalStyle.actionWrapper}>
                <CardButton
                  title={"Save"}
                  onPress={onSave}
                  isDisabled={isLoading}
                />
              </View>
            </View>
          )}
        </View>
      </ModalView>
    </>
  );
};
export default PartnerConnectionModal;
