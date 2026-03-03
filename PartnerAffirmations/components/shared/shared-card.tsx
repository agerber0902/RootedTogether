import React from "react";
import FadeInView from "./fade-in-animated-view";
import { sharedCardStyles } from "@/constants/stylesheets/components/shared/shared-card-styles";
import { View, ViewStyle } from "react-native";

type SharedCardType = {
  animationDuration?: number;
  visible: boolean;
  children: React.ReactNode;
  cardContainerStyle?: ViewStyle;
  cardContentStyle?: ViewStyle;
};
const SharedCard = ({
  animationDuration,
  visible,
  children,
  cardContainerStyle,
  cardContentStyle
}: SharedCardType) => {
  const style = sharedCardStyles;

  return (
    <>
      <FadeInView
        duration={animationDuration ?? 2000}
        delay={500}
        visible={visible}
        style={[style.cardContainer, cardContainerStyle ?? {}]}
      >
        <View style={[style.cardContent, cardContentStyle]}>
            {children}
        </View>
      </FadeInView>
    </>
  );
};
export default SharedCard;
