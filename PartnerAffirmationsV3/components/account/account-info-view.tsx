import { ScrollView, View } from "react-native";
import CardButton from "../shared/card-button";
import { accountInfoViewStyle } from "@/style/stylesheets/account/account-info-view-style";
import EditableAccountValue from "./editable-account-value";
import { useState } from "react";
import { useAppSelector } from "@/state/hooks";

const AccountInfoView = () => {

  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  // editable account details
  const [name, setName] = useState<string>(affirmationUser?.name ?? '');
  const [first, setFirst] = useState<string>(affirmationUser?.first ?? '');
  const [last, setLast] = useState<string>(affirmationUser?.last ?? '');
  const [email, setEmail] = useState<string>(affirmationUser?.email ?? '');

  const resetDetails = () => {
    setName(affirmationUser?.name ?? '');
    setFirst(affirmationUser?.first ?? '');
    setLast(affirmationUser?.last ?? '');
    setEmail(affirmationUser?.email ?? '');
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
