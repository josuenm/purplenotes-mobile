import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginProps, RegisterProps, UserProps } from "../types/UserProps";

const api = axios.create({
  baseURL: "https://purplenotes-api-production.up.railway.app/users",
});

const getToken = async () => {
  const token = (await AsyncStorage.getItem("@purplenotes:token")) as string;
  return JSON.parse(token).value.split('"').join("");
};

export default {
  login: async (data: LoginProps) => {
    return await api
      .post("/login", data)
      .then((response) => response)
      .catch((error) => error.response);
  },

  register: async (data: RegisterProps) => {
    return await api
      .post("/register", data)
      .then((response) => response)
      .catch((error) => error.response);
  },

  updateBasicInfo: async (data: UserProps) => {
    return await api
      .put("/", data, {
        headers: { "purplenotes.token": await getToken() },
      })
      .then((data) => data)
      .catch((error) => error.response);
  },

  updatePassword: async (data: string) => {
    return await api
      .put("/password", data, {
        headers: { "purplenotes.token": await getToken() },
      })
      .then((data) => data)
      .catch((error) => error.response);
  },

  deleteAccount: async () => {
    return await api
      .delete("/delete", {
        headers: { "purplenotes.token": await getToken() },
      })
      .then((data) => data)
      .catch((error) => error.response);
  },
};
