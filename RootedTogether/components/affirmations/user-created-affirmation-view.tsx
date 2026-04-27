import { ScrollView, View } from "react-native";
import DisplayCard from "../shared/display-card";
import { userCreatedAffirmationsCardStyle } from "@/style/stylesheets/affirmations/user-created-affirmations-card-style";
import ListedAffirmationView from "./listed-affirmation-view";
import CardButton from "../shared/card-button";
import EmptyListWarning from "../shared/empty-list-warning";
import { useAppSelector } from "@/state/hooks";
import AffirmationsModal from "@/app/modals/affirmations-modal";
import { useState } from "react";
import { Affirmation } from "@/models/affirmation";
import { useAuth } from "@/provider/auth-provider";
import CreateAccountButtonView from "../shared/create-account-button-view";

const UserCreatedAffirmationView = () => {
  const { isAuthenticated } = useAuth();

  const { userCreatedAffirmations } = useAppSelector(
    (state) => state.affirmation.value,
  );
  const hasAffirmations = userCreatedAffirmations.length > 0;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [affirmationToEdit, setAffirmationToEdit] = useState<
    Affirmation | undefined
  >();

  const onAdd = () => {
    setAffirmationToEdit(undefined);
    setIsModalVisible(true);
  };

  const onEdit = (affirmation: Affirmation) => {
    setAffirmationToEdit(affirmation);
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setAffirmationToEdit(undefined);
    setIsModalVisible(false);
  };

  return (
    <>
      <AffirmationsModal
        isVisible={isModalVisible}
        onBackDrop={onModalClose}
        onClose={onModalClose}
        affirmation={affirmationToEdit}
        setAffirmation={setAffirmationToEdit}
      />

      <DisplayCard>
        <>
          {/* User Created Affirmations */}
          <ScrollView
            style={userCreatedAffirmationsCardStyle.scrollView}
            scrollEnabled={true}
          >
            {!hasAffirmations && (
              <View
                style={userCreatedAffirmationsCardStyle.emptyWarningContainer}
              >
                <EmptyListWarning text="You do not have any affirmations yet, create as many as you like." />
              </View>
            )}
            {hasAffirmations &&
              userCreatedAffirmations.map((affirmation) => (
                <ListedAffirmationView
                  key={affirmation.id}
                  affirmation={affirmation}
                  onEdit={onEdit}
                  canEdit={true}
                />
              ))}
          </ScrollView>

          {/* Add Button */}
          {!isAuthenticated ? (
            <CreateAccountButtonView text="You need an account to add your own affirmations."/>
          ) : (
            <View style={userCreatedAffirmationsCardStyle.buttonContainer}>
              <CardButton
                key={"create-affirmation"}
                title="Create an Affirmation"
                onPress={onAdd}
                isDisabled={false}
              />
            </View>
          )}
        </>
      </DisplayCard>
    </>
  );
};
export default UserCreatedAffirmationView;
