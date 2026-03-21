import AffirmationHeader from "@/components/affirmations/affirmation-header";
import AffirmationText from "@/components/affirmations/affirmation-text";
import CreatedAffirmationView from "@/components/affirmations/created-affirmation-view";
import AddOrEditAffirmationModal from "@/components/modals/add-edit-affirmation-modal";
import DeleteAffirmationModal from "@/components/modals/delete-affirmation-modal";
import LoginModal from "@/components/modals/login-modal";
import Button from "@/components/shared/button";
import SharedCard from "@/components/shared/shared-card";
import SharedSafeView from "@/components/shared/shared-safe-view";
import SharedText from "@/components/shared/shared-text";
import { Affirmation } from "@/constants/models/affirmation";
import { affirmationCardStyles } from "@/constants/stylesheets/components/affimations/affirmation-card-styles";
import { getUserCreatedAffirmations } from "@/helpers/affirmation-helper";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  setAffirmationToEditOrDelete,
  setUserCreatedAffirmations,
} from "@/state/slices/affirmation";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const AffirmationsScreen = () => {
  const { user, isAuthenticated } = useAuth();

  const dispatch = useAppDispatch();
  const { userCreatedAffirmations } = useAppSelector(
    (state) => state.affirmation.value,
  );

  const [selectedAffirmationId, setSelectedAffirmationId] =
    useState<string>("");

  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const createButtonPressed = () => {
    dispatch(setAffirmationToEditOrDelete(undefined));
    // open modal
    setShowAddEditModal(true);
  };

  const editButtonPressed = (affirmation: Affirmation) => {
    // setSelectedAffirmationId(affirmationId);
    dispatch(setAffirmationToEditOrDelete(affirmation));
    setShowAddEditModal(true);
  };
  const deleteButtonPressed = (affirmation: Affirmation) => {
    setSelectedAffirmationId(affirmation.id!);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const getDisplayAffirmations = async () => {
      const createdAffirmations = await getUserCreatedAffirmations(
        user?.uid ?? "0",
      );

      dispatch(setUserCreatedAffirmations(createdAffirmations));
    };

    getDisplayAffirmations();
  }, [dispatch, user]);

  return (
    <>
      {!isAuthenticated ? (
        <LoginModal />
      ) : (
        <SharedSafeView header={<AffirmationHeader />}>
          <>
            <AddOrEditAffirmationModal
              isVisible={showAddEditModal}
              toggleVisibleState={() => setShowAddEditModal(!showAddEditModal)}
            />
            <DeleteAffirmationModal
              showModal={showDeleteModal}
              setShowModal={setShowDeleteModal}
              affirmationToDeleteId={selectedAffirmationId}
            />

            <SharedCard visible={true}>
              {(!userCreatedAffirmations ||
                userCreatedAffirmations.length <= 0) && (
                <View style={affirmationCardStyles.noAffirmationTextContainer}>
                  <SharedText
                    style={[
                      affirmationCardStyles.noAffirmationText,
                      { textAlign: "center" },
                    ]}
                    numberOfLines={3}
                    text="You do not have any affirmations yet, create as many as you like."
                  />
                </View>
              )}
              <ScrollView scrollEnabled={true}>
                {userCreatedAffirmations.map((affirmation: Affirmation) => (
                  <CreatedAffirmationView
                    key={affirmation.id}
                    affirmation={affirmation}
                    onEdit={editButtonPressed}
                    onDelete={deleteButtonPressed}
                  >
                    <AffirmationText
                      key={affirmation.id}
                      style={affirmationCardStyles.affirmation}
                      text={affirmation.message}
                    />
                  </CreatedAffirmationView>
                ))}
              </ScrollView>
              <Button
                onPress={createButtonPressed}
                title="Create Affirmation"
              />
            </SharedCard>
          </>
        </SharedSafeView>
      )}
    </>
  );
};
export default AffirmationsScreen;
