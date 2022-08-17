import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.8:8080/users",
});

export default {
  login: async (data: { email: string; password: string }) => {
    await api
      .post("/login", data)
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error));
  },

  register: async (data: { name: string; email: string; password: string }) => {
    await api
      .post("/register", data)
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error));
  },
};
