const GET_SETTINGS = "GET_SETTINGS";
const SAVE_SETTINGS = "SAVE_SETTINGS";
const CLEAR_SETTINGS = "CLEAR_SETTINGS";
const LOADING = "LOADING";
const END_LOADING = "END_LOADING";

const initialState = {
  isLoading: false,
  settings: [],
  errors: null,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return {
        ...state,
        isLoading: false,
        settings: [...action.payload],
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        isLoading: false,
        settings: [...action.payload],
      };
    case CLEAR_SETTINGS:
      return {
        ...state,
        isLoading: false,
        settings: [],
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getSettings = (payload) => ({ type: GET_SETTINGS, payload });
export const saveSettings = (payload) => ({ type: SAVE_SETTINGS, payload });
export const loading = () => ({ type: LOADING });
export const loading_end = () => ({ type: END_LOADING });
