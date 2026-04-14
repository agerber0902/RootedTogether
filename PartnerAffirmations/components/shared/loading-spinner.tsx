import { loadingSpinnerStyle } from "@/style/stylesheets/components/shared/loading-spinner-style";
import { ActivityIndicator, View, ViewStyle } from "react-native";

type LoadingSpinnerProps = {
    viewStyle?: ViewStyle;
}

const LoadingSpinner = ({viewStyle = {padding: 5}} : LoadingSpinnerProps) => {
    return (
        <View style={viewStyle}>
            <ActivityIndicator size="large" color={loadingSpinnerStyle.spinner.color} />
        </View>
    );
};
export default LoadingSpinner;