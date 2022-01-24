import axios from "axios";
import { loading, load_complete, login, logout } from "../AuthReducer";

export const authUser = (loginData) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .post("/auth/login", { ...loginData })
      .then((response) => {
        dispatch(login(response.data));
        localStorage.setItem("access", JSON.stringify(response.data.token));
      })
      .catch((error) => {
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

export const checkAuth = (token) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .post(`/auth/checkToken/`, { token })
      .then((response) => {
        localStorage.setItem("access", JSON.stringify(response.data.token));
        dispatch(login(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

/* export const logoutUser = () => {
  return()
}; */
