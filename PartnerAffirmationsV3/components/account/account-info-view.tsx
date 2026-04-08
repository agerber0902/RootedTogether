import { ScrollView, View } from "react-native";
import PrimaryButton from "../shared/primary-button";
import { accountInfoViewStyle } from "@/style/stylesheets/account/account-info-view-style";
import EditableAccountValue from "./editable-account-value";
import { _currentUser } from "@/data/mock";

const AccountInfoView = () => {
  return (
    <View style={accountInfoViewStyle.container}>
      <ScrollView scrollEnabled={true}>
        {/* Full Name */}
        <EditableAccountValue title="Name" value={_currentUser.name} />
        {/* First Name */}
        <EditableAccountValue title="First" value={_currentUser.first} />
        {/* Last Name */}
        <EditableAccountValue title="Last" value={_currentUser.last}/>
        {/* Email */}
        <EditableAccountValue title="Email" value={_currentUser.email}/>
      </ScrollView>

      {/* Edit Button */}
      <PrimaryButton
        title="Edit Account"
        onPress={() => {}}
        isDisabled={false}
      />
    </View>
  );
};
export default AccountInfoView;
