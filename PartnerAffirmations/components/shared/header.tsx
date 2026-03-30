import FadeInView from "./fade-in-animated-view";
import { useAuth } from "@/providers/auth-provider";
import { baseAnimationDuration } from "@/constants/theme";
import React from "react";
import SharedText from "./shared-text";
import { StyleProp, TextStyle } from "react-native";
import { headerStyles } from "@/constants/stylesheets/components/header-styles";

type HeaderProps = {
  headerText: string;
  headerStyle?: StyleProp<TextStyle>;
  subHeaderText: string;
  subHeaderStyle?: StyleProp<TextStyle>;
};

const Header = ({ headerText, subHeaderText, headerStyle, subHeaderStyle }: HeaderProps) => {
  const { isAuthenticated } = useAuth();

  // Animation order goes view, then twice the amount of time as the preceeding animation
  const viewAnimationDuration = baseAnimationDuration;
  const headerAnimationDuration = viewAnimationDuration * 2;
  const subHeaderAnimationDuration = headerAnimationDuration * 2;

  return (
    <FadeInView
      style={headerStyles.headerContainer}
      duration={baseAnimationDuration}
      visible={isAuthenticated}
    >
      <FadeInView
        duration={headerAnimationDuration}
        visible={isAuthenticated}
      >
        <SharedText
          style={[headerStyles.headerText, headerStyle]}
          numberOfLines={3}
          text={headerText}
        />
      </FadeInView>
      <FadeInView
        duration={subHeaderAnimationDuration}
        visible={isAuthenticated}
      >
        <SharedText
          style={[headerStyles.headerSubText, subHeaderStyle]}
          numberOfLines={2}
          text={subHeaderText}
        />
      </FadeInView>
    </FadeInView>
  );
};
export default Header;
