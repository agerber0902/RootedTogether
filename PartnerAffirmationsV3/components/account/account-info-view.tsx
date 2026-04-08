import { ScrollView, View } from "react-native";
import PrimaryButton from "../shared/primary-button";
import { accountInfoViewStyle } from "@/style/stylesheets/account/account-info-view-style";
import EditableAccountValue from "./editable-account-value";
import { _currentUser } from "@/data/mock";
import { useState } from "react";

const AccountInfoView = () => {

  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <View style={accountInfoViewStyle.container}>
      <ScrollView scrollEnabled={true}>
        {/* Full Name */}
        <EditableAccountValue title="Name" value={_currentUser.name} isEdit={isEdit}/>
        {/* First Name */}
        <EditableAccountValue title="First" value={_currentUser.first} isEdit={isEdit}/>
        {/* Last Name */}
        <EditableAccountValue title="Last" value={_currentUser.last} isEdit={isEdit}/>
        {/* Email */}
        <EditableAccountValue title="Email" value={_currentUser.email} isEdit={isEdit}/>
      </ScrollView>

      {/* Edit Button */}
      <PrimaryButton
        title="Edit Account"
        onPress={() => setIsEdit(!isEdit)}
        isDisabled={false}
      />
    </View>
  );
};
export default AccountInfoView;
