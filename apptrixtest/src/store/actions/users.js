import api from "../../http";
import { getUser, getUsers, loading, load_complete } from "../usersReducer";

export const loadUsersFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/api/admin/users/?fields=id,login,name,email")
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(load_complete);
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

export const getUserFromApi = (id) => {
  console.log(id);
  return (dispatch) => {
    dispatch(loading());
    api
      .get(`/api/admin/users/${id}?fields=id,login,name,email`)
      .then((response) => {
        console.log(response.data);
        dispatch(getUser(response.data));
      })
      .catch((error) => {
        dispatch(load_complete());
        console.log(error.response);
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};
