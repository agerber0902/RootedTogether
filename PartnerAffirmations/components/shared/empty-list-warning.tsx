import { emptyListWarningStyle } from "@/style/stylesheets/components/shared/empty-list-warning-style";
import { Text } from "react-native";

type EmptyListWarningProps = {
    text: string;
};

const EmptyListWarning = ({ text} : EmptyListWarningProps) => {
  return (
    <Text style={emptyListWarningStyle.text} numberOfLines={2} ellipsizeMode="tail">
      {text}
    </Text>
  );
};
export default EmptyListWarning;
