import { StatusBar } from "native-base";
import React from "react";
import AppContainer from "./src/components/AppContainer";
import AppNavigation from "./src/components/AppNavigation";

export default function App() {
  return (
    <AppContainer>
      <StatusBar translucent />
      <AppNavigation />
    </AppContainer>
  );
}
