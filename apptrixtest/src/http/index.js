const axios = require("axios").default;

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const URL = "https://example.youtrack.cloud";
const access = localStorage.getItem("access");

const api = axios.create({
  withCredentials: true,
  baseURL: URL,
});

api.interceptors.request.use((config) => {
  if (!process.env.REACT_APP_TOKEN) {
    config.headers.Authorization = "";
  }

  console.log(process.env.REACT_APP_TOKEN);
  config.headers.Authorization = `Bearer ${process.env.REACT_APP_TOKEN}`;

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refresh = localStorage.getItem("refresh");
        console.log(refresh);
        const response = await axios.post(
          `http://erp.apptrix.ru/api/token/refresh/`,
          { refresh }
        );
        localStorage.setItem("access", response.data.access);
        return api.request(originalRequest);
      } catch (error) {
        console.log("Не авторизован");
        /*       localStorage.clear();
        window.location.href = "/"; */
      }
    }
  }
);

export default api;
