import { View, ViewStyle } from "react-native";
import { displayCardStyle } from "@/style/stylesheets/components/shared/display-card-style";
import FadeInView from "./fade-in-view";
import { animationStyle } from "@/style/stylesheets/components/shared/animation-style";

type DisplayCardProps = {
  children: React.ReactNode;
  style?: ViewStyle | undefined;
  wrapperStyle?: ViewStyle | undefined;
};

const DisplayCard = ({ children, style, wrapperStyle }: DisplayCardProps) => {
  return (
    <>
      <FadeInView
        visible={true}
        delay={animationStyle.delay.cardDelay}
        duration={animationStyle.duration.cardDuration}
      >
        <View style={wrapperStyle}>
          <View style={[displayCardStyle.cardContainer, style]}>
            <View style={displayCardStyle.cardContent}>{children}</View>
          </View>
        </View>
      </FadeInView>
    </>
  );
};
export default DisplayCard;
