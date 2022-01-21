const SET_SERVICE = "SET_SERVICE";
const SET_TYPE = "SET_TYPE";
const SET_DATE = "SET_DATE";
const SET_EMPLOYEE = "SET_EMPLOYEE";
const SET_VISITOR = "SET_VISITOR";
const GET_TICKETS = "GET_TICKETS";
const SAVE_REQUEST = "SAVE_REQUEST";

const initialState = {
  service: null,
  type: null,
  date: null,
  employeeId: null,
  visitorId: null,
  tickets: null,
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICE:
      return {
        ...state,
        service: action.payload,
      };
    case SET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_EMPLOYEE:
      return {
        ...state,
        employeeId: action.payload,
      };
    case SET_VISITOR:
      return {
        ...state,
        visitorId: action.payload,
      };
    case GET_TICKETS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const setService = (payload) => ({ type: SET_SERVICE, payload });
export const setType = (payload) => ({ type: SET_TYPE, payload });
export const setDate = (payload) => ({ type: SET_DATE, payload });
export const setEmployee = (payload) => ({ type: SET_EMPLOYEE, payload });
export const setVisitor = (payload) => ({ type: SET_VISITOR, payload });
