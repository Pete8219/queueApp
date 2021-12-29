import api from "../../http";
import { setUserProfile } from "../roleReducer";
import {
  createUser,
  endLoading,
  filterUsers,
  getUsers,
  startLoading,
  updateProfile,
} from "../userReducer";

export const getUsersFromApi = () => {
  return (dispatch) => {
    dispatch(startLoading());
    api
      .get("/users")
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(endLoading());
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };
};
export const getUserProfile = (id) => {
  return (dispatch) => {
    api
      .get(`/users/profile/${id}`)
      .then((response) => {
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

export const updateUserProfile = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(startLoading());
    api
      .patch(`/users/profile/${data._id}`, { ...data.userData })
      .then((response) => {
        console.log(response.data);
        dispatch(updateProfile(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(endLoading());
      });
  };
};
