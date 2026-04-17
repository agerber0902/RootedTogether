import Notifications from "expo-notifications";
import { isDevice } from "expo-device";

export const getNotificationToken = async (): Promise<string | undefined> => {
  if (!isDevice) return undefined;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error("Permission not granted");
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
};
