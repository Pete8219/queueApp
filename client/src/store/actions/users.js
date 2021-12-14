import api from "../../http";
import { setUserProfile } from "../roleReducer";
import {
  createUser,
  endLoading,
  filterUsers,
  startLoading,
} from "../userReducer";

export const getUserProfile = (id) => {
  console.log(id);
  return (dispatch) => {
    api
      .get(`/users/profile/${id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setUserProfile(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    api
      .delete(`/users/${id}`)
      .then((response) => {
        dispatch(filterUsers(id));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const newUser = (data) => {
  return (dispatch) => {
    dispatch(startLoading());
    api
      .post("/users/create", { ...data })
      .then((response) => {
        //console.log(response)
        dispatch(createUser(response.data));
      })

      .catch((error) => {
        console.log(error.response);
        dispatch(endLoading());
      });
  };
};
