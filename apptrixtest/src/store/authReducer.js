const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const LOAD_COMPLETE = "LOAD_COMPLETE";
const AUTHENTICATE = "AUTHENTICATE";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case AUTHENTICATE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        access_token: null,
        isLoading: false,
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

export const login = () => ({ type: LOGIN });
export const authenticate = () => ({ type: AUTHENTICATE });
export const load_complete = () => ({ type: LOAD_COMPLETE });
export const logout = () => ({ type: LOGOUT });
