import { partnerInfoRowStyles } from "@/constants/stylesheets/components/account/partner/partner-info-row-styles";
import { Platform, useWindowDimensions, View } from "react-native";
import PartnerNameText from "./partner-name-text";
import SharedText from "@/components/shared/shared-text";
import { partnerInfoTextStyles } from "@/constants/stylesheets/components/account/partner/partner-info-text-styles";
import EditIconButton from "@/components/shared/edit-icon-button";
import DeleteIconButton from "@/components/shared/delete-icon-button";
import { PartnerConnectionDisplay } from "@/constants/models/partnerConnection";
import { useState } from "react";
import {
  deletePartnerConnection,
  getPartnerConnections,
} from "@/helpers/partner-helper";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setDisplayConnections, setPartnerConnections } from "@/state/slices/partner-connection";
import LoadingSpinner from "@/components/shared/loading-spinner";
import AddPartnerModal from "@/components/modals/add-partner-modal";

type PartnerInfoRowProps = {
  connection: PartnerConnectionDisplay;
};

const PartnerInfoRow = ({ connection }: PartnerInfoRowProps) => {
  const { width } = useWindowDimensions();

  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsDeleteLoading(true);

      await deletePartnerConnection(connection.connectionId!);

      // update
      const { connections, displays } = await getPartnerConnections(
        affirmationUser?.uid ?? "",
      );

      dispatch(setPartnerConnections(connections));
      dispatch(setDisplayConnections(displays));

    } finally {
      //  Add delay to make it not so jumpy
      setTimeout(() => {
        setIsDeleteLoading(false);
      }, 1000);
    }
  };

  const onEdit = () => {
    setShowEditModal(true);
  };

  const lineBreak = Platform.OS !== "web" || width < 700;
  return (
    <>
      <AddPartnerModal
        isVisible={showEditModal}
        toggleVisibleState={setShowEditModal}
        connection={connection}
      />

      <View style={partnerInfoRowStyles.mainContainer}>
        <View style={partnerInfoRowStyles.partnerNameContainer}>
          <PartnerNameText
            partnerName={connection.partnerName ?? ""}
            partnerDisplayName={connection.partnerDisplayName}
          />
        </View>
        <View style={partnerInfoRowStyles.createdDateContainer}>
          {lineBreak && (
            <SharedText
              style={partnerInfoTextStyles.partnerFullName}
              text={`Partners Since:`}
            />
          )}
          <SharedText
            style={partnerInfoTextStyles.partnerFullName}
            text={`${!lineBreak ? "Partners Since: " : ""}${connection.createdAt}`}
          />
        </View>
        <View style={partnerInfoRowStyles.actionContainer}>
          {isDeleteLoading ? (
            <LoadingSpinner viewStyle={{ padding: 5 }} />
          ) : (
            <>
              <EditIconButton onEdit={onEdit} />
              <DeleteIconButton onClick={onDelete} />
            </>
          )}
        </View>
      </View>
    </>
  );
};
export default PartnerInfoRow;
