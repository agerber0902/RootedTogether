import { welcomeStyles } from "@/constants/stylesheets/components/welcome-styles";
import Header from "../shared/header";
import { useAppSelector } from "@/state/hooks";

const WelcomeMessage = () => {

  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const getWelcomeMessage = (): {
    welcomeMessage: string;
    welcomeSubMessage: string;
  } => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return {
        welcomeMessage: `Good morning, ${affirmationUser?.first}`,
        welcomeSubMessage: `Begin each day with gratitude and positivity`,
      };
    } else if (currentHour >= 12 && currentHour < 17) {
      return {
        welcomeMessage: `Good afternoon, ${affirmationUser?.first}`,
        welcomeSubMessage: `Continue your day with gratitude and positivity`,
      };
    } else if (currentHour >= 17 && currentHour < 21) {
      return {
        welcomeMessage: `Good evening, ${affirmationUser?.first}`,
        welcomeSubMessage: `Take a breath and reflect on the day that was`,
      };
    } else {
      return {
        welcomeMessage: `Hello, ${affirmationUser?.first}`,
        welcomeSubMessage: `Take a breath to be present in the moment`,
      };
    }
  };

  return (
    <>
      <Header
        headerText={getWelcomeMessage().welcomeMessage}
        subHeaderText={getWelcomeMessage().welcomeSubMessage}
        headerStyle={welcomeStyles.welcomeText}
        subHeaderStyle={welcomeStyles.welcomeSubText}
      />
    </>
  );
};
export default WelcomeMessage;
