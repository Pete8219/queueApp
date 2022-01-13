import api from "../../http";
import {
  createType,
  deleteType,
  getTypes,
  loading,
  loading_end,
  setCurrentType,
} from "../serviceTypesReducer";

export const getTypesFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/servicetypes")
      .then((response) => {
        dispatch(getTypes(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};

export const createNewType = (data) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .post("/servicetypes/create", { ...data })
      .then((response) => {
        dispatch(createType(response.data));
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};

export const getCurrentType = (id) => {
  return (dispatch) => {
    dispatch(setCurrentType(id));
  };
};

export const removeType = (id) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .delete(`/servicetypes/delete/${id}`)
      .then((response) => {
        dispatch(deleteType(id));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};
