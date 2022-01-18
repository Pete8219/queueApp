import { authenticate, load_complete, login, logout } from "../authReducer";

const axios = require("axios").default;

export const authUser = (loginData) => {
  console.log(loginData);
  return (dispatch) => {
    dispatch(login);

    axios
      .post("http://erp.apptrix.ru/api/token/", { ...loginData })
      .then((response) => {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        dispatch(authenticate());
      })
      .catch((error) => {
        dispatch(logout());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};
