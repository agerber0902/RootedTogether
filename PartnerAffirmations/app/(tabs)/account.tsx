import AccountHeader from "@/components/account/account-header";
import AccountInfoValueView from "@/components/account/account-info-value-view";
import LoginModal from "@/components/modals/login-modal";
import Button from "@/components/shared/button";
import SharedCard from "@/components/shared/shared-card";
import SharedSafeView from "@/components/shared/shared-safe-view";
import { AffirmationUser } from "@/constants/models/user";
import { accountInfoStyles } from "@/constants/stylesheets/components/account/account-info-styles";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";

const AccountScreen = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { user, isAuthenticated } = useAuth();

  // Set State for each value
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
    setIsEditMode(false);
  };

  const onSave = () => {
    if (!affirmationUser) {
      return;
    }

    const updatedUser: AffirmationUser = {
      ...affirmationUser,
      first: firstName,
      last: lastName,
      name: fullName,
    };
    console.log(updatedUser);
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginModal />
      ) : (
        <SharedSafeView header={<AccountHeader />}>
          <>
            {/* Account Info Card */}
            <SharedCard
              cardContainerStyle={accountInfoStyles.infoCardContainer}
              cardContentStyle={accountInfoStyles.infoCardContent}
              visible={true}
            >
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
              </View>
            </SharedCard>

            {/* Partner Info Card */}
            {/* <SharedCard/> */}
          </>
        </SharedSafeView>
      )}
    </>
  );
};
export default AccountScreen;
