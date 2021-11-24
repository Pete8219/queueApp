import * as actions from "./actions";

const initialState = {
  token: null,
  isAuthenticated: false,
  isFetching: false,
  currentUser: {},
};

function getUserInfo(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        form,
      };
    default:
      return state;
  }
}
