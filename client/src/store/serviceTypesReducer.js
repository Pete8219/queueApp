const GET_TYPES = "GET_TYPES";
const FILTER_TYPES = "FILTER_TYPES";
const CREATE_TYPE = "CREATE_TYPE";
const UPDATE_TYPE = "UPDATE_TYPE";
const CURRENT_TYPE = "CURRENT_TYPE";
const DELETE_TYPE = "DELETE_TYPE";
const LOADING = "LOADING";
const LOADING_END = "LOADING_END";

const initialState = {
  isLoading: false,
  types: [],
  current: [],
  errors: null,
};

export const serviceTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TYPES:
      return {
        ...state,
        isLoading: false,
        types: [...action.payload],
      };
    case FILTER_TYPES:
      const filterTypes = state.types.filter(
        (type) => type._id !== action.payload
      );

      return {
        ...state,
        isLoading: false,
        types: [...filterTypes],
      };
    case CURRENT_TYPE:
      const currentType = state.types.filter(
        (type) => type._id === action.payload
      );
      return {
        ...state,
        current: [...currentType],
      };

    case CREATE_TYPE:
      const temp = [...state.types];
      temp.push(action.payload);
      return {
        ...state,
        isLoading: false,
        types: [...temp],
      };
    case UPDATE_TYPE:
      const updateType = state.types.map((type) => {
        if (type._id === action.payload._id) {
          type.title = action.payload.title;
          type.duration = action.payload.duration;
        }
        return type;
      });

      return {
        ...state,
        isLoading: false,
        types: [...updateType],
      };

    case DELETE_TYPE:
      const filteredTypes = state.types.filter(
        (type) => type._id !== action.payload
      );

      return {
        ...state,
        isLoading: false,
        types: [...filteredTypes],
      };
    case LOADING_END:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const getTypes = (payload) => ({ type: GET_TYPES, payload });
export const filterTypes = (payload) => ({ type: FILTER_TYPES, payload });
export const setCurrentType = (payload) => ({ type: CURRENT_TYPE, payload });
export const createType = (payload) => ({ type: CREATE_TYPE, payload });
export const updateType = (payload) => ({ type: UPDATE_TYPE, payload });
export const deleteType = (payload) => ({ type: DELETE_TYPE, payload });
export const loading = () => ({ type: LOADING });
export const loading_end = () => ({ type: LOADING_END });
