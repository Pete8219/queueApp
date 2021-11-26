const GET_USERS = "GET_USERS";

const initialState = {
  users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
};

export const getUsers = (payload) => ({ type: GET_USERS, payload });
