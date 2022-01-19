const LOADING = "LOADING";
const LOAD_COMPLETE = "LOAD_COMPLETE";
const GET_TASKS = "GET_TASKS";
const GET_TASK = "GET_TASK";

const initialState = {
  tasks: [],
  task: null,
  isLoading: false,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
        isLoading: false,
      };
    case GET_TASK:
      return {
        ...state,
        isLoading: false,
        task: action.payload,
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

export const getTasks = (payload) => ({ type: GET_TASKS, payload });
export const getTask = (payload) => ({ type: GET_TASK, payload });
export const loading = () => ({ type: LOADING });
export const load_complete = () => ({ type: LOAD_COMPLETE });
