const GET_USERS = "GET_USERS";
const CREATE_USER = "CREATE_USER";
const FILTER_USERS = "FILTER_USERS";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
const START_LOAD = "START_LOAD";
const END_LOAD = "END_LOAD";

const initialState = {
  users: [],
  message: null,
  errors: null,
  isLoading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOAD:
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
    case CREATE_USER:
      const newState = { ...state };
      newState.users.push(action.payload.user);
      return {
        ...state,
        users: [...newState.users],
        message: action.payload.message,
        isLoading: false,
      };
    case FILTER_USERS:
      const filtered = state.users.filter(
        (user) => user._id !== action.payload
      );
      return {
        ...state,
        users: [...filtered],
      };
    case END_LOAD:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getUsers = (payload) => ({ type: GET_USERS, payload });
export const createUser = (payload) => ({ type: CREATE_USER, payload });
export const filterUsers = (payload) => ({ type: FILTER_USERS, payload });
export const updateProfile = (payload) => ({
  type: UPDATE_USER_PROFILE,
  payload,
});
export const startLoading = () => ({ type: START_LOAD });
export const endLoading = () => ({ type: END_LOAD });
