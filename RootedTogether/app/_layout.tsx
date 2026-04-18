import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import {
  Cormorant_300Light,
  Cormorant_400Regular,
  Cormorant_500Medium,
  Cormorant_300Light_Italic,
  useFonts,
} from "@expo-google-fonts/cormorant";
import {
  SourceSans3_400Regular,
  SourceSans3_500Medium,
} from "@expo-google-fonts/source-sans-3";
import { useEffect } from "react";
import { useAuth } from "@/provider/auth-provider";
import LayoutWrapper from "./layoutWrapper";
import LoginModal from "./modals/login-modal";
import AppBootstrap from "../components/app-bootstrap";
import LoadingSpinner from "@/components/shared/loading-spinner";
import NotificationWrapper from "./notificationWrapper";

export const unstable_settings = {
  anchor: "(tabs)",
};

const RootNavigator = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingSpinner viewStyle={{ flex: 1 }} />;
  }

  if (!isAuthenticated) {
    return <LoginModal/>;
  }

  return (
    <AppBootstrap>
      {isAuthenticated && <NotificationWrapper />}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </AppBootstrap>
  );
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Cormorant_300Light,
    Cormorant_400Regular,
    Cormorant_500Medium,
    Cormorant_300Light_Italic,
    SourceSans3_400Regular,
    SourceSans3_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <LayoutWrapper>
        <RootNavigator />
      </LayoutWrapper>
    </>
  );
}
