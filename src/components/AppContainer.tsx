import { NavigationContainer } from "@react-navigation/native";
import { GlobalToolsContextProvider } from "../contexts/globalToolsContext";
import { NotesContextProvider } from "../contexts/notesContext";
import { UserContextProvider } from "../contexts/userContext";
import { navigationRef } from "../utils/RootNavigation";

interface AppContainerProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <NavigationContainer ref={navigationRef}>
      <GlobalToolsContextProvider>
        <UserContextProvider>
          <NotesContextProvider>{children}</NotesContextProvider>
        </UserContextProvider>
      </GlobalToolsContextProvider>
    </NavigationContainer>
  );
}
