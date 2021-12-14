const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const APP_GET_USER_INFO = "APP_GET_USER_INFO";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const APP_USER_INFO_ERROR = "APP_USER_INFO_ERROR";
const FETCH_DATA = "FETCH_DATA";
const FETCH_END = "FETCH_END";

const defaultState = {
  token: JSON.parse(localStorage.getItem("userData")) || null,
  user: null,
  role: null,
  userId: null,
  isAuthenticated: false,
  isFetching: false,
  ready: false,
  error: null,
};

export const roleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case APP_GET_USER_INFO:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.userType,
        userId: action.payload.userId,
        isAuthenticated: true,
        isFetching: false,
        error: null,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    case APP_USER_INFO_ERROR:
      return {
        ...state,
        error: action.payload.message,
        isFetching: false,
      };

    case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
        role: null,
        userId: null,
        isAuthenticated: false,
        isFetching: false,
        ready: false,
      };

    case FETCH_DATA:
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

export const readyToLogin = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });
export const fetchData = () => ({ type: FETCH_DATA });
export const getUserData = (payload) => ({ type: APP_GET_USER_INFO, payload });
export const setUserProfile = (payload) => ({
  type: SET_USER_PROFILE,
  payload,
});
export const errorData = (payload) => ({ type: APP_USER_INFO_ERROR, payload });
export const closeFetchData = () => ({ type: FETCH_END });
