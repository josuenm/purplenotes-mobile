import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { navigationRef } from "../utils/RootNavigation";
import theme from "../utils/theme";

interface AppContainerProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </NavigationContainer>
  );
}
