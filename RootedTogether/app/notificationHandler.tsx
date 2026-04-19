import { useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { updateUser } from "@/helpers/user-helper";
import { AffirmationUser } from "@/models/user";
import { setUser } from "@/state/slices/user-slice";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

const registerForPushNotificationsAsync = async (): Promise<
  string | undefined
> => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#898973",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      return;
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      return;
    }
  } else {
    return;
  }
};

const NotificationHandler = () => {
  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);

  const addTokenToUser = async (token: string) => {

    if(affirmationUser?.notificationToken === token){
      return;
    }

    const updatedUser: AffirmationUser = {
      id: affirmationUser?.id,
      uid: affirmationUser?.uid ?? '',
      name: affirmationUser?.name ?? '',
      first: affirmationUser?.first ?? '',
      last: affirmationUser?.last ?? '',
      email: affirmationUser?.email ?? '',
      notificationToken: token,
    };
    const user = await updateUser(updatedUser);

    dispatch(setUser(user));
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => addTokenToUser(token ?? ""))
      .catch();

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return <></>;
};
export default NotificationHandler;
