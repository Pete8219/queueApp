import {
  setDate,
  setEmployee,
  setService,
  setType,
  setVisitor,
} from "../requestReducer";

export const addServiceToRequest = (id) => {
  return (dispatch) => {
    dispatch(setService(id));
  };
};

export const addTypeToRequest = (id) => {
  return (dispatch) => {
    dispatch(setType(id));
  };
};

export const addDateToRequest = (date) => {
  return (dispatch) => {
    dispatch(setDate(date));
  };
};

export const addEmployeeToRequest = (id) => {
  return (dispatch) => {
    dispatch(setEmployee(id));
  };
};

export const addVisitorToRequest = (id) => {
  return (dispatch) => {
    dispatch(setVisitor(id));
  };
};
