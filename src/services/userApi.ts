import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.9:8080/users",
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
