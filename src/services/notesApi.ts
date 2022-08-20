import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Keys from "../utils/KeysFile";

const api = axios.create({
  baseURL: `${Keys.API_URL}/notes`,
});

const getToken = async () => {
  const token = (await AsyncStorage.getItem("@purplenotes:token")) as string;
  return JSON.parse(token).value.split('"').join("");
};

export default {
  allNotes: async () => {
    return await api
      .get("/", {
        headers: {
          "purplenotes.token": await getToken(),
        },
      })
      .then((response) => response)
      .catch((error) => error.response);
  },

  create: async () => {
    const data = {
      title: "New note",
      body: "<p>New note</p>",
    };

    return await api
      .post("/", data, {
        headers: {
          "purplenotes.token": await getToken(),
        },
      })
      .then((response) => response)
      .catch((error) => error.response);
  },

  delete: async (id: string) => {
    return await api
      .delete(`/${id}`, {
        headers: {
          "purplenotes.token": await getToken(),
        },
      })
      .then((response) => response)
      .catch((error) => error.response);
  },
};
