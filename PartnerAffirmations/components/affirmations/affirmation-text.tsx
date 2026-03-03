import FadeInView from "../shared/fade-in-animated-view";
import { affirmationTextStyles } from "@/constants/stylesheets/components/affimations/affirmation-text";
import SharedText from "../shared/shared-text";

type AffirmationTextProps = {
  text: string;
};

const AffirmationText = ({text} : AffirmationTextProps) => {
  const style = affirmationTextStyles;

  return (
    <>
      <FadeInView style={style.textContainer}>
        <SharedText numberOfLines={3} style={style.textContent} text={text} />
      </FadeInView>
    </>
  );
};
export default AffirmationText;
