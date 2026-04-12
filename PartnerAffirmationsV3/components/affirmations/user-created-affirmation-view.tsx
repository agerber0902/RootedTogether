import { ScrollView, View } from "react-native";
import DisplayCard from "../shared/display-card";
import { userCreatedAffirmationsCardStyle } from "@/style/stylesheets/affirmations/user-created-affirmations-card-style";
import ListedAffirmationView from "./listed-affirmation-view";
import CardButton from "../shared/card-button";
import EmptyListWarning from "../shared/empty-list-warning";
import { useAppSelector } from "@/state/hooks";
import AffirmationsModal from "@/app/modals/affirmations-modal";
import { useState } from "react";

const UserCreatedAffirmationView = () => {
  const { userCreatedAffirmations } = useAppSelector(
    (state) => state.affirmation.value,
  );
  const hasAffirmations = userCreatedAffirmations.length > 0;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onAdd = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <AffirmationsModal
        isVisible={isModalVisible}
        onBackDrop={() => setIsModalVisible(false)}
        onClose={() => setIsModalVisible(false)}
        affirmation={undefined}
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
                />
              ))}
          </ScrollView>

          {/* Add Button */}
          <View style={userCreatedAffirmationsCardStyle.buttonContainer}>
            <CardButton
              key={"create-affirmation"}
              title="Create Affirmation"
              onPress={() => {}}
              isDisabled={false}
            />
          </View>
        </>
      </DisplayCard>
    </>
  );
};
export default UserCreatedAffirmationView;
