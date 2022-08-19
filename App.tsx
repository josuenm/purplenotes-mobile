import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider, StatusBar } from "native-base";
import React from "react";
import AppContainer from "./src/components/AppContainer";
import AppNavigation from "./src/components/AppNavigation";
import theme from "./src/utils/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <AppContainer>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="rgba(238, 238, 238, .6)"
        />
        <AppNavigation />
      </AppContainer>
    </NativeBaseProvider>
  );
}
