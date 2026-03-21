import { partnerInfoCardStyles } from "@/constants/stylesheets/components/account/partner/partner-info-card-styles";
import PartnerInfoRow from "./partner-info-row";
import Button from "@/components/shared/button";
import { View } from "react-native";
import AddPartnerModal from "@/components/modals/add-partner-modal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import SharedText from "@/components/shared/shared-text";
import { getPartnerConnections } from "@/helpers/partner-helper";
import { setDisplayConnections, setPartnerConnections } from "@/state/slices/partner-connection";

const PartnerInfoView = () => {
  const dispatch = useAppDispatch();
  const { partnerConnections, displayConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    const getPartners = async () => {

      const { connections, displays } = await getPartnerConnections(affirmationUser!.uid);

      dispatch(setPartnerConnections(connections));
      dispatch(setDisplayConnections(displays));
    };

    if (!partnerConnections || partnerConnections.length <= 0) {
      getPartners();
    }
  }, [partnerConnections, affirmationUser, dispatch]);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  return (
    <>
      <AddPartnerModal
        isVisible={showAddModal}
        toggleVisibleState={setShowAddModal}
      />

      <View style={{width: '100%', marginTop: 10}}>
        {(!displayConnections || displayConnections.length <= 0) && (
          <SharedText
            style={partnerInfoCardStyles.noPartnersText}
            text="No partners created yet, create as many as you like!"
          />
        )}
        <View style={{ width: "100%" }}>
          {displayConnections.map((connection) => (
            <PartnerInfoRow key={connection.connectionId} connection={connection} />
          ))}
        </View>

        <View style={partnerInfoCardStyles.actions}>
          <Button
            viewStyle={partnerInfoCardStyles.addButton}
            title="Add Partner"
            onPress={() => setShowAddModal(true)}
          />
        </View>
      </View>
    </>
  );
};
export default PartnerInfoView;
