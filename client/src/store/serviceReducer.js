const GET_SERVICES = "GET_SERVICES";
const FILTER_SERVICE = "FILTER_SERVICE";
const ADD_SERVICE = "ADD_SERVICE";
const CURRENT_SERVICE = "CURRENT_SERVICE";
const UPDATE_SERVICE = "UPDATE_SERVICE";
const FETCH_END = "FETCH_END";
const FETCH_START = "FETCH_START";
const ERROR_SERVICE_INFO = "ERROR_SERVICE_INFO";

const initialState = {
  isFetching: false,
  services: [],
  errors: null,
  message: null,
  service: null,
};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        isFetching: false,
        services: [...action.payload],
      };
    case FILTER_SERVICE:
      let filteredService = state.services.filter(
        (service) => service._id !== action.payload
      );
      return {
        ...state,
        services: [...filteredService],
      };
    case ADD_SERVICE:
      const cloneStore = { ...state };
      cloneStore.services.push(action.payload.service);
      return {
        ...state,
        isFetching: false,
        services: [...cloneStore.services],
        message: action.payload.message,
      };
    case CURRENT_SERVICE:
      const currentService = state.services.filter(
        (service) => service._id === action.payload
      );
      return {
        ...state,
        service: [...currentService],
      };
    case FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_END:
      return {
        ...state,
        isFetching: false,
      };
    case ERROR_SERVICE_INFO:
      return {
        ...state,
        errors: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};

export const getServices = (payload) => ({ type: GET_SERVICES, payload });
export const filterServices = (payload) => ({ type: FILTER_SERVICE, payload });
export const addService = (payload) => ({ type: ADD_SERVICE, payload });
export const currentService = (payload) => ({ type: CURRENT_SERVICE, payload });
export const updateService = (payload) => ({ type: UPDATE_SERVICE, payload });
export const fetchComplited = (payload) => ({ type: FETCH_END, payload });
export const fetchStart = () => ({ type: FETCH_START });
export const showError = (payload) => ({ type: ERROR_SERVICE_INFO, payload });
