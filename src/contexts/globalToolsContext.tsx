import { createNavigationContainerRef } from "@react-navigation/native";
import { useToast } from "native-base";
import { createContext, useState } from "react";
import { SpinnerLoading } from "../components/LoadingScreen";

export interface GlobalToolsContextProps {
  handleError: ({ title }: { title: string }) => void;
  handleLoading: (value: boolean) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const GlobalToolsContext = createContext<GlobalToolsContextProps | null>(
  null
);

export const GlobalToolsContextProvider = ({ children }: ProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  function handleLoading(value: boolean) {
    setIsLoading(value);
  }

  function handleError({ title }: { title: string }) {
    toast.show({
      title,
      duration: 3000,
      bgColor: "red.600",
    });
  }

  return (
    <GlobalToolsContext.Provider value={{ handleLoading, handleError }}>
      {isLoading && <SpinnerLoading />}
      {children}
    </GlobalToolsContext.Provider>
  );
};
