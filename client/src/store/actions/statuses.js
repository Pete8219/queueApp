import api from "../../http";
import {
  getStatuses,
  loading,
  loading_end,
  createStatus,
  deleteStatus,
} from "../statusesReducer";

export const getAllStatusesFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/statementstatuses")
      .then((response) => {
        dispatch(getStatuses(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};

export const addNewStatus = (data) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .post("/statementstatuses/create", { ...data })
      .then((response) => {
        dispatch(createStatus(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};

export const removeStatus = (id) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .delete(`/statementstatuses/delete/${id}`)
      .then((response) => {
        dispatch(deleteStatus(id));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};
