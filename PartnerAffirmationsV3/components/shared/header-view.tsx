import { headerViewStyle } from "@/style/stylesheets/components/shared/header-view-style";
import { Text, View } from "react-native";
import FadeInView from "./fade-in-view";
import { animationStyle } from "@/style/stylesheets/components/shared/animation-style";

type HeaderTextProps = {
  title: string;
  subText?: string | undefined;
};

const HeaderView = ({ title, subText }: HeaderTextProps) => {
  return (
    <>
      <FadeInView
        visible={true}
        delay={animationStyle.delay.headerDelay}
        duration={animationStyle.duration.headerDuration}
      >
        <View style={headerViewStyle.headerView}>
          <Text
            style={headerViewStyle.headerText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {subText && (
            <Text
              style={headerViewStyle.subTitleText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {subText}
            </Text>
          )}
        </View>
      </FadeInView>
    </>
  );
};
export default HeaderView;
