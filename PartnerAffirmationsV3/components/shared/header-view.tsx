import { headerViewStyle } from "@/style/stylesheets/components/header-view-style";
import { Text, View } from "react-native";

type HeaderTextProps = {
  title: string;
  subText?: string | undefined;
};

const HeaderView = ({ title, subText }: HeaderTextProps) => {
  return (
    <>
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
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {subText}
          </Text>
        )}
      </View>
    </>
  );
};
export default HeaderView;
