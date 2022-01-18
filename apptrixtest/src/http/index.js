const axios = require("axios").default;

const $api = axios.create({
  withCredentials: true,
  baseURL: "https://www.jetbrains.com",
});

$api.interceptors.request.use((config) => {
  if (!localStorage.getItem("access")) {
    config.headers.Authorization = "";
  }

  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("access")
  )}`;

  return config;
});

$api.interceptors.response.use(
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
        const response = await axios.get(
          `http://erp.apptrix.ru/api/token/refresh/`,
          { withCredentials: true }
        );
        localStorage.setItem("access", response.data.access);
        return $api.request(originalRequest);
      } catch (error) {
        console.log("Не авторизован");
        localStorage.clear();
        window.location.href = "/";
      }
    }
  }
);

export default $api;
