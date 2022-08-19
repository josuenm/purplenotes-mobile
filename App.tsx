import { StatusBar } from "native-base";
import React from "react";
import AppContainer from "./src/components/AppContainer";
import AppNavigation from "./src/components/AppNavigation";
import BottomNavigation from "./src/components/BottomNavigation";
import { GlobalToolsContextProvider } from "./src/contexts/globalToolsContext";
import { NotesContextProvider } from "./src/contexts/notesContext";
import { UserContextProvider } from "./src/contexts/userContext";

export default function App() {
  return (
    <AppContainer>
      <GlobalToolsContextProvider>
        <UserContextProvider>
          <NotesContextProvider>
            <StatusBar
              translucent
              barStyle="dark-content"
              backgroundColor="rgba(238, 238, 238, .6)"
            />
            <AppNavigation />
            <BottomNavigation />
          </NotesContextProvider>
        </UserContextProvider>
      </GlobalToolsContextProvider>
    </AppContainer>
  );
}
