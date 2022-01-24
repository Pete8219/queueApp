const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const LOADING = "LOADING";
const LOAD_COMPLETE = "LOAD_COMPLETE";

const initialState = {
  token: JSON.parse(localStorage.getItem("userData")) || null,
  user: null,
  role: null,
  userId: null,
  isAuthenticated: false,
  isLoading: false,
  error: [],
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.userType,
        userId: action.payload.userId,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        role: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        error: [],
      };
    case LOAD_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const loading = () => ({ type: LOADING });
export const load_complete = () => ({ type: LOAD_COMPLETE });
export const login = (payload) => ({ type: LOGIN, payload });
export const logout = () => ({ type: LOGOUT });
