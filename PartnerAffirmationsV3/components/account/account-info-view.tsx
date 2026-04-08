import { ScrollView, View } from "react-native";
import CardButton from "../shared/card-button";
import { accountInfoViewStyle } from "@/style/stylesheets/account/account-info-view-style";
import EditableAccountValue from "./editable-account-value";
import { _currentUser } from "@/data/mock";
import { useState } from "react";

const AccountInfoView = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // editable account details
  const [name, setName] = useState<string>(_currentUser.name);
  const [first, setFirst] = useState<string>(_currentUser.first);
  const [last, setLast] = useState<string>(_currentUser.last);
  const [email, setEmail] = useState<string>(_currentUser.email);

  const resetDetails = () => {
    setName(_currentUser.name);
    setFirst(_currentUser.first);
    setLast(_currentUser.last);
    setEmail(_currentUser.email);
  }

  const onCancel = () => {
    resetDetails();
    setIsEdit(false);
  }

  return (
    <View style={accountInfoViewStyle.container}>
      <ScrollView scrollEnabled={true}>
        {/* Full Name */}
        <EditableAccountValue
          title="Name"
          value={name}
          setValue={setName}
          isEdit={isEdit}
        />
        {/* First Name */}
        <EditableAccountValue
          title="First"
          value={first}
          setValue={setFirst}
          isEdit={isEdit}
        />
        {/* Last Name */}
        <EditableAccountValue
          title="Last"
          value={last}
          setValue={setLast}
          isEdit={isEdit}
        />
        {/* Email */}
        <EditableAccountValue
          title="Email"
          value={email}
          setValue={setEmail}
          isEdit={isEdit}
        />
      </ScrollView>

      {/* Edit Button */}
      {!isEdit ? (
        <CardButton
          title={"Edit Account"}
          onPress={() => setIsEdit(!isEdit)}
          isDisabled={isEdit}
        />
      ) : (
        <View style={accountInfoViewStyle.editActions}>
          <View style={accountInfoViewStyle.actionWrapper}>
            <CardButton
              title="Cancel"
              onPress={onCancel}
              isDisabled={!isEdit}
              isSecondary={true}
            />
          </View>
          <View style={accountInfoViewStyle.actionWrapper}>
            <CardButton title={"Save"} onPress={() => {}} isDisabled={isEdit} />
          </View>
        </View>
      )}
    </View>
  );
};
export default AccountInfoView;
