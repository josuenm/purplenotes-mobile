import { useToast } from "native-base";
import { createContext, useState } from "react";
import { SpinnerLoading } from "../components/LoadingScreen";

export interface GlobalToolsContextProps {
  handleLoading: (value: boolean) => void;
  handleError: (title: string) => void;
  handleSuccessful: (title: string) => void;
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

  function handleError(title: string) {
    toast.show({
      title,
      duration: 3000,
      bgColor: "red.600",
    });
  }

  function handleSuccessful(title: string) {
    toast.show({
      title,
      duration: 3000,
      bgColor: "green.600",
    });
  }

  return (
    <GlobalToolsContext.Provider
      value={{ handleLoading, handleError, handleSuccessful }}
    >
      {isLoading && <SpinnerLoading />}
      {children}
    </GlobalToolsContext.Provider>
  );
};
