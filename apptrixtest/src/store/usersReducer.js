const LOADING = "LOADING";
const LOAD_COMPLETE = "LOAD_COMPLETE";
const GET_USERS = "GET_USERS";
const GET_USER = "GET_USER";

const initialState = {
  users: [],
  user: null,
  isLoading: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload],
        isLoading: false,
      };
    case GET_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
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

export const getUsers = (payload) => ({ type: GET_USERS, payload });
export const getUser = (payload) => ({ type: GET_USER, payload });
export const loading = () => ({ type: LOADING });
export const load_complete = () => ({ type: LOAD_COMPLETE });
