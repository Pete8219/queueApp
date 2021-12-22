const GET_STATUSES = "GET_STATUSES";
const FILTER_STATUSES = "FILTER_STATUSES";
const CREATE_STATUS = "CREATE_STATUS";
const UPDATE_STATUS = "UPDATE_STATUS";
const DELETE_STATUS = "DELETE_STATUS";
const LOADING = "LOADING";
const LOADING_END = "LOADING_END";

const initialState = {
  isLoading: false,
  statuses: [],
  errors: null,
};

export const statusesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUSES:
      return {
        ...state,
        isLoading: false,
        statuses: [...action.payload],
      };
    case FILTER_STATUSES:
      const filterStatuses = state.statuses.filter(
        (status) => status._id !== action.payload
      );

      return {
        ...state,
        isLoading: false,
        statuses: [...filterStatuses],
      };

    case CREATE_STATUS:
      const temp = [...state.statuses];
      temp.push(action.payload);
      return {
        ...state,
        isLoading: false,
        statuses: [...temp],
      };
    case UPDATE_STATUS:
      const updateStatus = state.statuses.map((status) => {
        if (status._id === action.payload._id) {
          status.title = action.payload.title;
        }
        return status;
      });

      return {
        ...state,
        isLoading: false,
        statuses: [...updateStatus],
      };

    case DELETE_STATUS:
      const filteredStatuses = state.statuses.filter(
        (status) => status._id !== action.payload
      );

      return {
        ...state,
        isLoading: false,
        statuses: [...filteredStatuses],
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

export const getStatuses = (payload) => ({ type: GET_STATUSES, payload });
export const filterStatuses = (payload) => ({ type: FILTER_STATUSES, payload });
export const createStatus = (payload) => ({ type: CREATE_STATUS, payload });
export const updateStatus = (payload) => ({ type: UPDATE_STATUS, payload });
export const deleteStatus = (payload) => ({ type: DELETE_STATUS, payload });
export const loading = () => ({ type: LOADING });
export const loading_end = () => ({ type: LOADING_END });
