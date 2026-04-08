import { ScrollView, View } from "react-native";
import PrimaryButton from "../shared/primary-button";
import { accountInfoViewStyle } from "@/style/stylesheets/account/account-info-view-style";

const AccountInfoView = () => {
  return (
    <View style={accountInfoViewStyle.container}>
      <ScrollView scrollEnabled={true}>
        
        

      </ScrollView>

      {/* Edit Button */}
      <PrimaryButton
        title="Edit Account"
        onPress={() => {}}
        isDisabled={false}
      />
    </ View>
  );
};
export default AccountInfoView;
