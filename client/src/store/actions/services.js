import api from "../../http";
import {
  getServices,
  loading,
  load_complete,
  filterServices,
  addService,
  showError,
  currentService,
  updateService,
} from "../serviceReducer";

export const getServicesFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/services")
      .then((response) => {
        dispatch(getServices(response.data));
      })
      .catch(function (error) {
        console.log(error.response);
        dispatch(load_complete());
      });
  };
};

export const createService = (data) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .post("/services/create", { ...data })
      .then((response) => {
        console.log(response);
        dispatch(addService(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(showError(error.response.data.errors));
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

export const editService = (id) => {
  return (dispatch) => {
    dispatch(currentService(id));
  };
};

export const patchService = (data) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .patch(`/services/${data._id}`, { ...data })
      .then((response) => {
        data.message = response.data.message;
        console.log(data);
        dispatch(updateService(data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete);
      });
  };
};

export const deleteService = (id) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .delete(`/services/${id}`)
      .then(() => {
        dispatch(filterServices(id));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};
