import { View } from "react-native";
import { displayCardStyle } from "@/style/stylesheets/components/shared/display-card-style";
import FadeInView from "./fade-in-view";
import { animationStyle } from "@/style/stylesheets/components/shared/animation-style";

const DisplayCard = () => {
  return (
    <>
      <FadeInView
        visible={true}
        delay={animationStyle.delay.cardDelay}
        duration={animationStyle.duration.cardDuration}
      >
        <View style={displayCardStyle.cardContainer}>
          <View style={displayCardStyle.cardContent}>{/* Hello, World */}</View>
        </View>
      </FadeInView>
    </>
  );
};
export default DisplayCard;
