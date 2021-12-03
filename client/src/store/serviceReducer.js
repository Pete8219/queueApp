const GET_SERVICES = "GET_SERVICES";
const FILTER_SERVICE = "FILTER_SERVICE";
const ADD_SERVICE = "ADD_SERVICE";
const FETCH_END = "FETCH_END";
const FETCH_START = "FETCH_START";

const initialState = {
  isFetching: false,
  services: [],
};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        isFetching: true,
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
      cloneStore.services.push(action.payload);
      return {
        ...state,
        isFetching: true,
        services: { ...cloneStore.services },
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

    default:
      return state;
  }
};

export const getServices = (payload) => ({ type: GET_SERVICES, payload });
export const filterServices = (payload) => ({ type: FILTER_SERVICE, payload });
export const addService = (payload) => ({ type: ADD_SERVICE, payload });
export const fetchComplited = (payload) => ({ type: FETCH_END, payload });
export const fetchStart = (payload) => ({ type: FETCH_START, payload });
