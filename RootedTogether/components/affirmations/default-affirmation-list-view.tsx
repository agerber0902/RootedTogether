import { useAppSelector } from "@/state/hooks";
import ListedAffirmationView from "./listed-affirmation-view";

const DefaultAffirmationListView = () => {
  const { defaultAffirmations } = useAppSelector(
    (state) => state.affirmation.value,
  );
  console.log(defaultAffirmations);
  return (
    <>
      {defaultAffirmations.map((affirmation) => (
        <ListedAffirmationView
          key={affirmation.id}
          affirmation={affirmation}
          onEdit={() => {}}
          canEdit={false}
        />
      ))}
    </>
  );
};
export default DefaultAffirmationListView;
