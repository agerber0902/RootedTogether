import { Affirmation } from "@/constants/models/affirmation";
import { createdAffirmationViewStyles } from "@/constants/stylesheets/components/affimations/created-affirmation-view-styles";
import { View } from "react-native";
import EditIconButton from "../shared/edit-icon-button";
import DeleteIconButton from "../shared/delete-icon-button";

type CreatedAffirmationViewProps = {
    children: React.ReactNode;
    affirmation: Affirmation;
    onEdit: (affirmation: Affirmation) => void;
    onDelete: (affirmation: Affirmation) => void;
}

const CreatedAffirmationView = ({children, affirmation, onEdit, onDelete}: CreatedAffirmationViewProps) => {
    const affirmationText = children;

    const onEditPressed = () => {
        onEdit(affirmation);
    };
    const onDeletePressed = () => {
        onDelete(affirmation);
    };

    return (<>
        <View style={createdAffirmationViewStyles.container}>
            <View style={createdAffirmationViewStyles.text}>
                {affirmationText}
            </View>
            <View style={createdAffirmationViewStyles.actions}>
                <EditIconButton onEdit={onEditPressed}/>
                <DeleteIconButton onClick={onDeletePressed} />
            </View>
        </View>
    </>);
};
export default CreatedAffirmationView;