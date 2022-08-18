import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Keys from "../utils/KeysFile";

const api = axios.create({
  baseURL: `${Keys.API_URL}/notes`,
});

export default {
  allNotes: async () => {
    return await api
      .get("/", {
        headers: {
          "purplenotes.token": (await AsyncStorage.getItem(
            "@purplenotes:token"
          )) as string,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));
  },
};
