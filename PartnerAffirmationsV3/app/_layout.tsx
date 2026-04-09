import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import {
  Cormorant_300Light,
  Cormorant_400Regular,
  Cormorant_500Medium,
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

export const unstable_settings = {
  anchor: "(tabs)",
};

const RootNavigator = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading || !isAuthenticated) {
    return <LoginModal/>;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Cormorant_300Light,
    Cormorant_400Regular,
    Cormorant_500Medium,
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
