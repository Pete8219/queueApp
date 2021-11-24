import {
  closeFetchData,
  errorData,
  getUserData,
  readyToLogin,
} from "./roleReducer";
const axios = require("axios").default;

export const fetchUser = (login) => {
  return function (dispatch) {
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
          console.log(error.response.data);
          dispatch(errorData(error.response.data));
        } else if (error.request) {
          console.log(error.request);
        }
      });
  };
};

export const checkToken = (token) => {
  return function (dispatch) {
    axios
      .post("/auth/checkToken", { token })
      .then(function (response) {
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.token)
        );
        console.log(response);
        dispatch(getUserData(response.data));
        dispatch(closeFetchData());
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  };
};
