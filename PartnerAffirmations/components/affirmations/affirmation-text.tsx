import FadeInView from "../shared/fade-in-animated-view";
import { affirmationTextStyles } from "@/constants/stylesheets/components/affimations/affirmation-text";
import SharedText from "../shared/shared-text";
import { TextStyle } from "react-native";

type AffirmationTextProps = {
  text: string;
  style?: TextStyle;
};

const AffirmationText = ({text, style} : AffirmationTextProps) => {

  return (
    <>
      <FadeInView style={affirmationTextStyles.textContainer}>
        <SharedText numberOfLines={4} style={[affirmationTextStyles.textContent, style]} text={text} />
      </FadeInView>
    </>
  );
};
export default AffirmationText;
