import { ScrollView, View, Text } from "react-native";
import CardButton from "../shared/card-button";
import { partnerConnectionsViewStyle } from "@/style/stylesheets/partner-connections/partner-connections-view-style";
import { PartnerConnectionDisplay } from "@/models/partner-connection";
import EmptyListWarning from "../shared/empty-list-warning";
import EditablePartnerConnectionValue from "./editable-partner-connection-value";
import { partnerConnectionDisplays } from "@/data/mock";

const PartnerConnectionsView = () => {
  const connections: PartnerConnectionDisplay[] = partnerConnectionDisplays;
  
  return (
    <>
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
          {!connections || connections.length <= 0 ? (
            <EmptyListWarning text="You do not have any partners yet, create as many as you like." />
          ) : (
            connections.map((connection: PartnerConnectionDisplay) => {
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
            onPress={() => {}}
            isDisabled={false}
          />
        </View>
      </View>
    </>
  );
};
export default PartnerConnectionsView;
