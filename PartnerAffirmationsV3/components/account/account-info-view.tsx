import { ScrollView, Text, View } from "react-native";
import CardButton from "../shared/card-button";
import { accountInfoViewStyle } from "@/style/stylesheets/account/account-info-view-style";
import EditableAccountValue from "./editable-account-value";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { stringExists } from "@/helpers/validation-helper";
import { updateUser } from "@/helpers/user-helper";
import { AffirmationUser } from "@/models/user";
import { setUser } from "@/state/slices/user-slice";
import LoadingSpinner from "../shared/loading-spinner";

const AccountInfoView = () => {
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  // editable account details
  const [name, setName] = useState<string>(affirmationUser?.name ?? "");
  const [first, setFirst] = useState<string>(affirmationUser?.first ?? "");
  const [last, setLast] = useState<string>(affirmationUser?.last ?? "");
  const [email, setEmail] = useState<string>(affirmationUser?.email ?? "");

  const resetDetails = () => {
    setName(affirmationUser?.name ?? "");
    setFirst(affirmationUser?.first ?? "");
    setLast(affirmationUser?.last ?? "");
    setEmail(affirmationUser?.email ?? "");
  };

  const onCancel = () => {
    resetDetails();
    setIsEdit(false);
  };

  const onSave = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      if (!affirmationUser?.id) {
        setError("Unable to update account right now.");
        return;
      }

      // Validate values
      if (!stringExists(name)) {
        setError("Name is invalid.");
        return;
      } else if (!stringExists(first)) {
        setError("First Name is invalid.");
        return;
      } else if (!stringExists(last)) {
        setError("Last Name is invalid.");
        return;
      } else if (!stringExists(email)) {
        setError("Email is invalid.");
        return;
      }

      const updatedUserPayload: AffirmationUser = {
        id: affirmationUser.id,
        uid: affirmationUser.uid,
        name: name.trim(),
        first: first.trim(),
        last: last.trim(),
        email: email.trim(),
      };

      const user = await updateUser(updatedUserPayload);

      if (!user) {
        setError("Unable to update account right now.");
        return;
      }

      dispatch(setUser(user));
      setIsEdit(false);
      setError(undefined);
    } catch {
      setError("An error occurred, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          isEdit={false}
        />
      </ScrollView>

      {/* Edit Button */}
      {!isEdit ? (
        <CardButton
          title={"Edit Account"}
          onPress={() => setIsEdit(!isEdit)}
          isDisabled={isEdit || isLoading}
        />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <View style={accountInfoViewStyle.editActions}>
          <View style={accountInfoViewStyle.actionWrapper}>
            <CardButton
              title="Cancel"
              onPress={onCancel}
              isDisabled={!isEdit || isLoading}
              isSecondary={true}
            />
          </View>
          <View style={accountInfoViewStyle.actionWrapper}>
            <CardButton
              title={"Save"}
              onPress={onSave}
              isDisabled={isLoading}
            />
          </View>
        </View>
      )}

      {!!error && <Text style={accountInfoViewStyle.errorText}>{error}</Text>}
    </View>
  );
};
export default AccountInfoView;
