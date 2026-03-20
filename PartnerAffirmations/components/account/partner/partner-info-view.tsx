import { partnerInfoCardStyles } from "@/constants/stylesheets/components/account/partner/partner-info-card-styles";
import PartnerInfoRow from "./partner-info-row";
import Button from "@/components/shared/button";
import { View } from "react-native";
import AddPartnerModal from "@/components/modals/add-partner-modal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import SharedText from "@/components/shared/shared-text";
import { getPartnerConnections } from "@/helpers/partner-helper";
import { setPartnerConnections } from "@/state/slices/partner-connection";

const PartnerInfoView = () => {
  const dispatch = useAppDispatch();
  const { partnerConnections } = useAppSelector(
    (state) => state.partnerConnection.value,
  );
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    const getPartners = async () => {
      dispatch(
        setPartnerConnections(
          await getPartnerConnections(affirmationUser!.uid),
        ),
      );
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
        {(!partnerConnections || partnerConnections.length <= 0) && (
          <SharedText
            style={partnerInfoCardStyles.noPartnersText}
            text="No partners created yet, create as many as you like!"
          />
        )}
        <View style={{ width: "100%" }}>
          {partnerConnections.map((connection) => (
            <PartnerInfoRow key={connection.id} connection={connection} />
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
