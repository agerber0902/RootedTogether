import { ScrollView, View } from "react-native";
import DisplayCard from "../shared/display-card";
import { _currentUser, affirmations } from "@/data/mock";
import { userCreatedAffirmationsCardStyle } from "@/style/stylesheets/affirmations/user-created-affirmations-card-style";
import ListedAffirmationView from "./listed-affirmation-view";
import CardButton from "../shared/card-button";
import EmptyListWarning from "../shared/empty-list-warning";

const UserCreatedAffirmationView = () => {
  const userCreatedAffirmations = affirmations.filter(
    (a) => a.creatorId === _currentUser.id,
  );;

  const hasAffirmations = userCreatedAffirmations.length > 0;

  return (
    <>
      <DisplayCard>
        <>
          {/* User Created Affirmations */}
          <ScrollView
            style={userCreatedAffirmationsCardStyle.scrollView}
            scrollEnabled={true}
          >
            {!hasAffirmations && (
              <View style={userCreatedAffirmationsCardStyle.emptyWarningContainer}>
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
