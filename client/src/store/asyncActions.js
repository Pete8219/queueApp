import { getUserTicketsFromAPI } from "./actions/tickets";

import {
  closeFetchData,
  errorData,
  fetchData,
  getUserData,
  readyToLogin,
} from "./roleReducer";

const axios = require("axios").default;

export const fetchUser = (login) => {
  return (dispatch) => {
    dispatch(fetchData());

    axios
      .post("/auth/login", { ...login })
      .then((response) => {
        localStorage.removeItem("url");
        console.log(response.message);
        dispatch(readyToLogin());
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.token)
        );

        dispatch(getUserData(response.data)); //  далее нужно подключить dispatch из tickets,чтобы загрузить все заявки выбранного пользователя
        dispatch(getUserTicketsFromAPI(response.data.userId));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(readyToLogin());
        if (error.response) {
          dispatch(errorData(error.response.data));
        } else if (error.request) {
        }
      });
  };
};

export const checkToken = (token) => {
  return (dispatch) => {
    dispatch(fetchData());

    axios
      .post("/auth/checkToken", { token })
      .then((response) => {
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.token)
        );

        dispatch(getUserData(response.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.toJSON());
        }
      })
      .finally(() => {
        dispatch(closeFetchData());
      });
  };
};
