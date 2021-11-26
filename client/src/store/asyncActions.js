import {
  closeFetchData,
  errorData,
  fetchData,
  getUserData,
  readyToLogin,
} from "./roleReducer";
const { store } = require("./index");
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

        dispatch(getUserData(response.data));
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
    axios
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
