import axios from "axios";
import Keys from "../utils/KeysFile";

const api = axios.create({
  baseURL: `${Keys.API_URL}/users`,
});

export default {
  login: async (data: { email: string; password: string }) => {
    return await api
      .post("/login", data)
      .then((response) => response)
      .catch((error) => error.response);
  },

  register: async (data: { name: string; email: string; password: string }) => {
    return await api
      .post("/register", data)
      .then((response) => response)
      .catch((error) => error.response);
  },
};
