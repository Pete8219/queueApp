import api from "../../http";
import {
  getServices,
  fetchStart,
  fetchComplited,
  filterServices,
  addService,
  showError,
  currentService,
} from "../serviceReducer";

export const getServicesFromApi = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    api
      .get("/services")
      .then(function (response) {
        dispatch(getServices(response.data));
      })
      .catch(function (error) {
        console.log(error.response);
        dispatch(fetchComplited());
      });
  };
};

export const createService = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(fetchStart());
    api
      .post("/services/create", { ...data })
      .then((response) => {
        console.log(response);
        dispatch(addService(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(showError(error.response.data.errors));
      });
  };
};

export const editService = (id) => {
  return (dispatch) => {
    dispatch(currentService(id));
  };
};

export const deleteService = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    api
      .delete(`/services/${id}`)
      .then(() => {
        dispatch(filterServices(id));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
