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
  return (dispatch) => {
    dispatch(fetchData());

    axios
      .post("/auth/login", { ...login })
      .then((response) => {
        localStorage.removeItem("url");
        dispatch(readyToLogin());
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.token)
        );

        dispatch(getUserData(response.data)); //  далее нужно подключить dispatch из tickets,чтобы загрузить все заявки выбранного пользователя
        dispatch(getUserTicketsFromAPI(response.data.userId));
      })
      .catch((error) => {
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

export const getAllUsers = () => {
  return (dispatch) => {
    api
      .get("/users")
      .then((response) => {
        dispatch(getUserData(response.data));
      })

      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const getAllServices = () => {
  return (dispatch) => {
    api
      .get("/services")
      .then((response) => {
        dispatch(getServices(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(fetchComplited());
      });
  };
};

export const getAllCategories = () => {
  return (dispatch) => {
    api
      .get("/categories")
      .then((response) => {
        dispatch(getCategories(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
