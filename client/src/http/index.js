const axios = require("axios").default;

const dotenv = require("dotenv");
dotenv.config();

const api = axios.create({
  baseURL: process.env.API_SERVER, //прокидываем адрес сервера API через переменные окружения
});

//через interceptor цепляем к каждому запросу access_token
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("access_token")
  )}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      alert(error.response.data.message);

      window.location.href = "/login";
    }
  }
);

export default api;
