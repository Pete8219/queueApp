import api from "../http";
import { getUserTicketsFromAPI } from "./actions/tickets";
import { getCategories } from "./categoriesReducer";
import {
  closeFetchData,
  errorData,
  fetchData,
  getUserData,
  readyToLogin,
} from "./roleReducer";
import { fetchComplited, getServices } from "./serviceReducer";

const axios = require("axios").default;

export const fetchUser = (login) => {
  return function (dispatch) {
    dispatch(fetchData());

    axios
      .post("/auth/login", { ...login })
      .then(function (response) {
        dispatch(readyToLogin());
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.token)
        );

        dispatch(getUserData(response.data)); //  далее нужно подключить dispatch из tickets,чтобы загрузить все заявки выбранного пользователя
        dispatch(getUserTicketsFromAPI(response.data.userId));
      })
      .catch(function (error) {
        dispatch(readyToLogin());
        if (error.response) {
          dispatch(errorData(error.response.data));
        } else if (error.request) {
        }
      });
  };
};

export const checkToken = (token) => {
  return function (dispatch) {
    dispatch(fetchData());

    axios
      .post("/auth/checkToken", { token })
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.token)
        );

        dispatch(getUserData(response.data));
        /* dispatch(closeFetchData()); */
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.toJSON());
        }
      })
      .finally(function () {
        dispatch(closeFetchData());
      });
  };
};

export const getAllUsers = () => {
  return (dispatch) => {
    api
      .get("/users")
      .then(function (response) {
        console.log(response.data);
        dispatch(getUserData(response.data));
      })

      .catch(function (error) {
        console.log(error.response);
      });
  };
};

export const getAllServices = () => {
  return (dispatch) => {
    api
      .get("/services")
      .then(function (response) {
        dispatch(getServices(response.data));
      })
      .catch(function (error) {
        console.log(error.response);
        dispatch(fetchComplited());
      });
  };
};

export const getAllCategories = () => {
  return (dispatch) => {
    api
      .get("/categories")
      .then(function (response) {
        dispatch(getCategories(response.data));
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
};
