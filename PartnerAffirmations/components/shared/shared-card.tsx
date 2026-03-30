import { StyleProp, View, ViewStyle } from "react-native";
import FadeInView from "./fade-in-animated-view";
import { sharedCardStyles } from "@/constants/stylesheets/components/shared/shared-card-styles";

type SharedCardProps = {
  children: React.ReactNode;
  visible?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const SharedCard = ({
  children,
  visible = true,
  containerStyle,
  contentStyle,
}: SharedCardProps) => {
  return (
    <FadeInView style={[sharedCardStyles.mainCardContainer, containerStyle]} visible={visible}>
      <View style={[sharedCardStyles.mainCardContent, contentStyle]}>
        {children}
      </View>
    </FadeInView>
  );
};
export default SharedCard;