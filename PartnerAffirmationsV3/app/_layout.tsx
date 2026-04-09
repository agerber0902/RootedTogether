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
import { AuthProvider } from "@/provider/auth-provider";

export const unstable_settings = {
  anchor: "(tabs)",
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
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}
