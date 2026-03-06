import AffirmationHeader from "@/components/affirmations/affirmation-header";
import AffirmationText from "@/components/affirmations/affirmation-text";
import CreatedAffirmationView from "@/components/affirmations/created-affirmation-view";
import AddAffirmationModal from "@/components/modals/add-affirmation-modal";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import Button from "@/components/shared/button";
import SharedCard from "@/components/shared/shared-card";
import SharedSafeView from "@/components/shared/shared-safe-view";
import SharedText from "@/components/shared/shared-text";
import { Affirmation } from "@/constants/models/affirmation";
import { affirmationCardStyles } from "@/constants/stylesheets/components/affimations/affirmation-card-styles";
import {
  deleteAffirmation,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setUserCreatedAffirmations } from "@/state/slices/affirmation";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const AffirmationsScreen = () => {
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  const { userCreatedAffirmations } = useAppSelector(
    (state) => state.affirmation.value,
  );

  const [selectedAffirmationId, setSelectedAffirmationId] =
    useState<string>("");
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const createButtonPressed = () => {
    // open modal
    setShowModal(true);
  };

  const editButtonPressed = (affirmationId: string) => {
    setSelectedAffirmationId(affirmationId);
  };
  const deleteButtonPressed = (affirmationId: string) => {
    setSelectedAffirmationId(affirmationId);
    setShowConfirmationModal(true);
  };

  const onDelete = async () => {
    try {
      setIsDeleteLoading(true);

      await deleteAffirmation(selectedAffirmationId);

      // update
      const createdAffirmations = await getUserCreatedAffirmations(
        user?.uid ?? "0",
      );

      dispatch(setUserCreatedAffirmations(createdAffirmations));
    } finally {
      //  Add delay to make it not so jumpy
      setTimeout(() => {
        setIsDeleteLoading(false);
        setShowConfirmationModal(false);
      }, 1000);
    }
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
      <SharedSafeView header={<AffirmationHeader />}>
        <>
          <ConfirmationModal
            isVisible={showConfirmationModal}
            isLoading={isDeleteLoading}
            toggleVisibleState={() =>
              setShowConfirmationModal(!showConfirmationModal)
            }
            text="You are about to delete an affirmation."
            confirmText="Delete"
            onCancel={() => setShowConfirmationModal(false)}
            onConfirm={() => onDelete()}
          />

          <AddAffirmationModal
            isVisible={showModal}
            toggleVisibleState={() => setShowModal(!showModal)}
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
                  affirmationId={affirmation.id ?? ""}
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
            <Button onPress={createButtonPressed} title="Create Affirmation" />
          </SharedCard>
        </>
      </SharedSafeView>
    </>
  );
};
export default AffirmationsScreen;
