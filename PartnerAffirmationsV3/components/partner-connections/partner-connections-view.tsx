import { ScrollView, View, Text } from "react-native";
import CardButton from "../shared/card-button";
import { partnerConnectionsViewStyle } from "@/style/stylesheets/partner-connections/partner-connections-view-style";
import { PartnerConnectionDisplay } from "@/models/partner-connection";
import EmptyListWarning from "../shared/empty-list-warning";
import EditablePartnerConnectionValue from "./editable-partner-connection-value";
import PartnerConnectionModal from "@/app/modals/partner-connection-modal";
import { useState } from "react";
import { useAppSelector } from "@/state/hooks";

const PartnerConnectionsView = () => {

  const { connectionDisplays } = useAppSelector((state) => state.partnerConnection.value);

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  return (
    <>
      <PartnerConnectionModal
        connection={undefined}
        isVisible={modalIsVisible}
        onBackDrop={() => setModalIsVisible(false)}
        onClose={() => setModalIsVisible(false)}
      />

      <View style={partnerConnectionsViewStyle.container}>
        {/* Header */}
        <Text
          style={partnerConnectionsViewStyle.headerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Partner Connections
        </Text>

        <ScrollView scrollEnabled={true}>
          {!connectionDisplays || connectionDisplays.length <= 0 ? (
            <EmptyListWarning text="You do not have any partners yet, create as many as you like." />
          ) : (
            connectionDisplays.map((connection: PartnerConnectionDisplay) => {
              return (
                <EditablePartnerConnectionValue
                  key={connection.connectionId}
                  connection={connection}
                />
              );
            })
          )}
        </ScrollView>

        {/* Create Button */}
        <View style={partnerConnectionsViewStyle.actions}>
          <CardButton
            key={"create-connection"}
            title={"Create Connection"}
            onPress={() => setModalIsVisible(true)}
            isDisabled={false}
          />
        </View>
      </View>
    </>
  );
};
export default PartnerConnectionsView;
