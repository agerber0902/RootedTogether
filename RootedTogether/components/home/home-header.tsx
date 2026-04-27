import { useAppSelector } from "@/state/hooks";
import HeaderView from "../shared/header-view";
import { useCallback, useMemo } from "react";

const HomeHeader = () => {
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const getWelcomeMessage = useCallback((): {
    welcomeMessage: string;
    welcomeSubMessage: string;
  } => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return {
        welcomeMessage: `Good morning, ${affirmationUser?.first ?? ''}`,
        welcomeSubMessage: `Begin each day with gratitude and positivity`,
      };
    } else if (currentHour >= 12 && currentHour < 17) {
      return {
        welcomeMessage: `Good afternoon, ${affirmationUser?.first ?? ''}`,
        welcomeSubMessage: `Continue your day with gratitude and positivity`,
      };
    } else if (currentHour >= 17 && currentHour < 21) {
      return {
        welcomeMessage: `Good evening, ${affirmationUser?.first ?? ''}`,
        welcomeSubMessage: `Take a breath and reflect on the day that was`,
      };
    } else {
      return {
        welcomeMessage: `Hello, ${affirmationUser?.first ?? ''}`,
        welcomeSubMessage: `Take a breath to be present in the moment`,
      };
    }
  }, [affirmationUser?.first]);

  const welcome = useMemo(() => getWelcomeMessage(), [getWelcomeMessage]);

  return (
    <>
      <HeaderView title={welcome.welcomeMessage} subText={welcome.welcomeSubMessage} />
    </>
  );
};
export default HomeHeader;
