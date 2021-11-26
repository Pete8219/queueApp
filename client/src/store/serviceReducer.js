const GET_SERVICES = "GET_SERVICES";

const initialState = {
  services: [],
};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        services: [...action.payload],
      };
    default:
      return state;
  }
};

export const getServices = (payload) => ({ type: GET_SERVICES, payload });
