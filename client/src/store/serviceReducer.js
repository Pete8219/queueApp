const GET_SERVICES = "GET_SERVICES";
const FILTER_SERVICE = "FILTER_SERVICE";
const ADD_SERVICE = "ADD_SERVICE";
const CURRENT_SERVICE = "CURRENT_SERVICE";
const UPDATE_SERVICE = "UPDATE_SERVICE";
const LOAD_COMPLETE = "FETCH_END";
const LOADING = "FETCH_START";
const ERROR_SERVICE_INFO = "ERROR_SERVICE_INFO";

const initialState = {
  isLoading: false,
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
        isLoading: false,
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
        isLoading: false,
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
    case UPDATE_SERVICE:
      const updState = { ...state };
      updState.services.forEach((item) => {
        if (item._id === action.payload._id) {
          item.title = action.payload.title;
          item.user = [...action.payload.user];
        }
      });

      return {
        ...state,
        isLoading: false,
        services: [...updState.services],
        service: null,
        message: action.payload.message,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    case ERROR_SERVICE_INFO:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
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
export const load_complete = () => ({ type: LOAD_COMPLETE });
export const loading = () => ({ type: LOADING });
export const showError = (payload) => ({ type: ERROR_SERVICE_INFO, payload });
