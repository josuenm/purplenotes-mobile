import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import userApi from "../services/userApi";
import { LoginProps, RegisterProps, UserProps } from "../types/UserProps";
import HandleToken from "../utils/HandleToken";
import * as RootNavigation from "../utils/RootNavigation";
import {
  GlobalToolsContext,
  GlobalToolsContextProps,
} from "./globalToolsContext";

interface ContextProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  Login: (data: LoginProps) => Promise<void>;
  Register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  Exit: () => void;
  UpdateBasicInfo: (data: UserProps) => void;
  UpdatePassword: (data: string) => void;
  Delete: () => void;
  user: null | UserProps;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: ContextProviderProps) => {
  const { handleError, handleLoading, handleSuccessful } = useContext(
    GlobalToolsContext
  ) as GlobalToolsContextProps;

  const [user, setUser] = useState<UserProps | null>(null);

  async function Exit() {
    handleLoading(true);
    await AsyncStorage.removeItem("@purplenotes:user");
    await AsyncStorage.removeItem("@purplenotes:token");
    setUser(null);
    RootNavigation.navigate("Login");
    handleLoading(false);
  }

  function handleUser(data: UserProps) {
    setUser(data);
    AsyncStorage.setItem("@purplenotes:user", JSON.stringify(data));
  }

  async function Login(data: LoginProps) {
    handleLoading(true);

    const response = (await userApi.login(data)) as unknown as {
      status: number;
      data: { token: string; user: { name: string; email: string } };
    };

    switch (response.status) {
      case 200:
        HandleToken.setItem(
          "@purplenotes:token",
          JSON.stringify(response.data.token),
          60 * 60 * 24 * 30
        );
        handleUser({
          name: response.data.user.name,
          email: response.data.user.email,
        });
        RootNavigation.navigate("Dashboard");
        break;

      case 401:
        handleError("Email or password is incorrect");
        break;

      case 404:
        handleError("User not found");
        break;

      default:
        handleError("Something wrong, try again");
        break;
    }

    handleLoading(false);
  }

  async function Register(data: RegisterProps) {
    handleLoading(true);

    const response = (await userApi.register(data)) as unknown as {
      status: number;
      data: { token: string; user: { name: string; email: string } };
    };

    switch (response.status) {
      case 201:
        HandleToken.setItem(
          "@purplenotes:token",
          JSON.stringify(response.data.token),
          60 * 60 * 24 * 30
        );
        handleUser({
          name: response.data.user.name,
          email: response.data.user.email,
        });
        RootNavigation.navigate("Dashboard");
        break;

      case 409:
        handleError("User already exists");
        break;

      default:
        handleError("Something wrong, try again");
        break;
    }

    handleLoading(false);
  }

  async function UpdateBasicInfo(data: UserProps) {
    if (user?.name === data.name && user?.email === data.email) {
      return;
    }
    handleLoading(true);
    const response = await userApi.updateBasicInfo(data);

    switch (response.status) {
      case 200:
        handleSuccessful("Successful update");
        handleUser({
          name: response.data.name,
          email: response.data.email,
        });
        break;

      default:
        handleError("Something wrong, try again");
        break;
    }

    handleLoading(false);
  }

  async function UpdatePassword(data: string) {
    handleLoading(true);
    const response = await userApi.updatePassword(data);

    switch (response.status) {
      case 200:
        handleSuccessful("Successful update");
        handleLoading(false);
        return true;
        break;

      default:
        handleError("Something wrong, try again");
        break;
    }

    handleLoading(false);
  }

  async function Delete() {
    handleLoading(true);
    const response = await userApi.deleteAccount();

    switch (response.status) {
      case 204:
        Exit();
        break;

      default:
        handleError("Something wrong, try again");
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
        Exit,
        UpdateBasicInfo,
        UpdatePassword,
        Delete,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
