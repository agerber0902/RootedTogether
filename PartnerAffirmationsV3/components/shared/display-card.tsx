import { View } from "react-native";
import { displayCardStyle } from "@/style/stylesheets/components/shared/display-card-style";

const DisplayCard = () => {
    return (
        <>
            <View style={displayCardStyle.cardContainer}>
                <View style={displayCardStyle.cardContent}>
                    {/* Hello, World */}
                </View>
            </View>
        </>
    );
};
export default DisplayCard;