const defaultState = {
  token: null,
  role: null,
  userId: null,
};

const roleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        userId: action.payload.userId,
      };

    default:
      return state;
  }
};
