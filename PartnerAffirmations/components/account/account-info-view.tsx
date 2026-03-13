import { AffirmationUser } from "@/constants/models/user";
import { accountInfoStyles } from "@/constants/stylesheets/components/account/account-info-styles";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import AccountInfoValueView from "./account-info-value-view";
import Button from "../shared/button";
import { updateUser } from "@/helpers/user-helper";
import { setUser } from "@/state/slices/user";
import LoadingSpinner from "../shared/loading-spinner";

const AccountInfoView = () => {
  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { user, isAuthenticated } = useAuth();

  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(affirmationUser?.name ?? "");
  const [firstName, setFirstName] = useState<string>(
    affirmationUser?.first ?? "",
  );
  const [lastName, setLastName] = useState<string>(affirmationUser?.last ?? "");

  useEffect(() => {
    if (affirmationUser) {
      setFullName(affirmationUser.name ?? "");
      setFirstName(affirmationUser.first ?? "");
      setLastName(affirmationUser.last ?? "");
    }
  }, [affirmationUser]);

  const onEditPressed = () => {
    setIsEditMode(!isEditMode);
  };
  const onCancel = () => {
    resetValues();
    setIsEditMode(false);
  };

  const resetValues = () => {
    setFullName(affirmationUser?.name ?? '');
    setFirstName(affirmationUser?.first ?? '');
    setLastName(affirmationUser?.last ?? '');
  }

  const onSave = async () => {
    if (!affirmationUser) {
      return;
    }

    setIsEditLoading(true);

    try {
      const updatedUser: AffirmationUser = {
        ...affirmationUser,
        first: firstName,
        last: lastName,
        name: fullName,
      };

      const user = await updateUser(updatedUser);
      console.log(user);
      dispatch(setUser(user));
    } finally {
      setIsEditLoading(false);
      setIsEditMode(false);
    }
  };

  return (
    <>
      <View style={accountInfoStyles.infoContainer}>
        <AccountInfoValueView
          valueField="Full Name"
          value={fullName}
          isEdit={isEditMode}
          onChange={setFullName}
        />
        <AccountInfoValueView
          valueField="First Name"
          value={firstName}
          isEdit={isEditMode}
          onChange={setFirstName}
        />
        <AccountInfoValueView
          valueField="Last Name"
          value={lastName}
          isEdit={isEditMode}
          onChange={setLastName}
        />
        <AccountInfoValueView
          valueField="Email"
          value={user?.email ?? ""}
          isEdit={false}
          onChange={() => {}}
        />

        {isEditLoading ? (
          <LoadingSpinner viewStyle={{ padding: 5 }} />
        ) : (
          <View style={accountInfoStyles.actions}>
            {isEditMode && (
              <Button
                viewStyle={accountInfoStyles.cancelButton as ViewStyle}
                textStyle={accountInfoStyles.cancelButtonText}
                onPress={onCancel}
                title="Cancel"
              />
            )}
            <Button
              title={isEditMode ? "Save" : "Edit"}
              onPress={isEditMode ? onSave : onEditPressed}
              viewStyle={{
                ...accountInfoStyles.editButtonView,
                width: isEditMode ? "35%" : "50%",
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};
export default AccountInfoView;
