import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import userApi from "../services/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from ".././utils/RootNavigation";
import {
  GlobalToolsContext,
  GlobalToolsContextProps,
} from "./globalToolsContext";

interface ContextProviderProps {
  children: React.ReactNode;
}

interface UserProps {
  name: string;
  email: string;
}

export interface UserContextProps {
  Login: (data: { email: string; password: string }) => Promise<void>;
  Register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  Exit: () => void;
  user: null | UserProps;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = ({ children }: ContextProviderProps) => {
  const { handleError, handleLoading } = useContext(
    GlobalToolsContext
  ) as GlobalToolsContextProps;

  const [user, setUser] = useState<UserProps | null>(null);

  async function Exit() {
    handleLoading(true);
    await AsyncStorage.removeItem("@purplenotes:user");
    await AsyncStorage.removeItem("@purplenotes:token");
    RootNavigation.navigate("Login");
    handleLoading(false);
  }

  function handleUser(data: UserProps) {
    setUser(data);
    AsyncStorage.setItem("@purplenotes:user", JSON.stringify(data));
  }

  async function Login(data: { email: string; password: string }) {
    handleLoading(true);

    const response = (await userApi.login(data)) as unknown as {
      status: number;
      data: { token: string; user: { name: string; email: string } };
    };

    switch (response.status) {
      case 200:
        AsyncStorage.setItem(
          "@purplenotes:token",
          JSON.stringify(response.data.token)
        );
        handleUser({
          name: response.data.user.name,
          email: response.data.user.email,
        });
        RootNavigation.navigate("Dashboard");
        break;

      case 401:
        handleError({
          title: "Email or password is incorrect",
        });
        break;

      case 404:
        handleError({
          title: "User not found",
        });
        break;

      default:
        handleError({
          title: "Something wrong, try again",
        });
        break;
    }

    handleLoading(false);
  }
  async function Register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    handleLoading(true);

    const response = (await userApi.register(data)) as unknown as {
      status: number;
      data: { token: string; user: { name: string; email: string } };
    };

    switch (response.status) {
      case 201:
        AsyncStorage.setItem(
          "@purplenotes:token",
          JSON.stringify(response.data.token)
        );
        handleUser({
          name: response.data.user.name,
          email: response.data.user.email,
        });
        RootNavigation.navigate("Dashboard");
        break;

      case 409:
        handleError({
          title: "User already exists",
        });
        break;

      default:
        handleError({
          title: "Something wrong, try again",
        });
        break;
    }

    handleLoading(false);
  }

  const getUser = useCallback(async () => {
    const data = await AsyncStorage.getItem("@purplenotes:user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        Login,
        Register,
        user,
        Exit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
