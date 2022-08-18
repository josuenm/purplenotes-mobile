import React from "react";
import AppContainer from "./src/components/AppContainer";
import AppNavigation from "./src/components/AppNavigation";
import { StatusBar } from "native-base";
import { GlobalToolsContextProvider } from "./src/contexts/globalToolsContext";
import { UserContextProvider } from "./src/contexts/userContext";

export default function App() {
  return (
    <AppContainer>
      <GlobalToolsContextProvider>
        <UserContextProvider>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="rgba(238, 238, 238, .6)"
          />
          <AppNavigation />
        </UserContextProvider>
      </GlobalToolsContextProvider>
    </AppContainer>
  );
}
