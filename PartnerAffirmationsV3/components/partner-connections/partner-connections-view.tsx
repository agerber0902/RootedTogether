import { ScrollView, View, Text } from "react-native";
import CardButton from "../shared/card-button";
import { partnerConnectionsViewStyle } from "@/style/stylesheets/partner-connections/partner-connections-view-style";
import { PartnerConnection } from "@/models/partner-connection";
import EmptyListWarning from "../shared/empty-list-warning";

const PartnerConnectionsView = () => {
  const connections: PartnerConnection[] = [];
  return (
    <>
      <View style={partnerConnectionsViewStyle.container}>

        {/* Header */}
        <Text style={partnerConnectionsViewStyle.headerText} numberOfLines={1} ellipsizeMode="tail">Partner Connections</Text>

        <ScrollView scrollEnabled={true}>
          {!connections || connections.length <= 0 ? (
            <EmptyListWarning text="You do not have any partners yet, create as many as you like." />
          ) : (
            <></>
          )}
        </ScrollView>

        {/* Create Button */}
        <CardButton
          key={"create-connection"}
          title={"Create Connection"}
          onPress={() => {}}
          isDisabled={false}
        />
      </View>
    </>
  );
};
export default PartnerConnectionsView;
