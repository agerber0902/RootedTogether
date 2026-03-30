import {
  baseAnimationDelayDuration,
  baseAnimationDuration,
} from "@/constants/theme";
import FadeInView from "../shared/fade-in-animated-view";
import ReworkedCard from "../shared/reworked-card";
import { createdAffirmationsCardStyles } from "@/constants/stylesheets/components/affimations/created-affirmations-card-styles";
import { Affirmation } from "@/constants/models/affirmation";
import { ScrollView, View } from "react-native";
import SharedText from "../shared/shared-text";
import CreatedAffirmationView from "./created-affirmation-view";
import AffirmationViewRow from "./affirmation-view-row";
import Button from "../shared/button";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setAffirmationToEditOrDelete } from "@/state/slices/affirmation";
import React, { useState } from "react";
import AddorEditAffirmationModal from "../modals/add-edit-affirmation-modal";
import DeleteAffirmationModal from "../modals/delete-affirmation-modal";

const CreatedAffirmationCard = () => {
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
    dispatch(setAffirmationToEditOrDelete(affirmation));
    setShowAddEditModal(true);
  };
  const deleteButtonPressed = (affirmation: Affirmation) => {
    setSelectedAffirmationId(affirmation.id!);
    setShowDeleteModal(true);
  };

  const hasCreatedAffirmations = userCreatedAffirmations.length > 0;

  return (
    <>
      <AddorEditAffirmationModal
        isVisible={showAddEditModal}
        toggleVisibleState={() => setShowAddEditModal(!showAddEditModal)}
      />
      <DeleteAffirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        affirmationToDeleteId={selectedAffirmationId}
      />

      <FadeInView
        duration={baseAnimationDuration}
        delay={baseAnimationDelayDuration * 1}
        visible={true}
        style={createdAffirmationsCardStyles.cardContainer}
      >
        <ReworkedCard
          containerStyle={createdAffirmationsCardStyles.card}
          contentStyle={createdAffirmationsCardStyles.cardContent}
        >
          <View style={createdAffirmationsCardStyles.listContainer}>
            {!hasCreatedAffirmations ? (
              <View
                style={createdAffirmationsCardStyles.noAffirmationTextContainer}
              >
                <SharedText
                  style={[
                    createdAffirmationsCardStyles.noAffirmationText,
                    { textAlign: "center" },
                  ]}
                  numberOfLines={3}
                  text="You do not have any affirmations yet, create as many as you like."
                />
              </View>
            ) : (
              <ScrollView
                style={createdAffirmationsCardStyles.scrollView}
                contentContainerStyle={createdAffirmationsCardStyles.scrollContent}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {userCreatedAffirmations.map((affirmation: Affirmation) => (
                  <CreatedAffirmationView
                    key={affirmation.id}
                    affirmation={affirmation}
                    onEdit={editButtonPressed}
                    onDelete={deleteButtonPressed}
                  >
                    <AffirmationViewRow affirmation={affirmation} />
                  </CreatedAffirmationView>
                ))}
              </ScrollView>
            )}
          </View>
          <View style={createdAffirmationsCardStyles.buttonContainer}>
            <Button onPress={createButtonPressed} title="Create Affirmation" />
          </View>
        </ReworkedCard>
      </FadeInView>
    </>
  );
};
export default CreatedAffirmationCard;
