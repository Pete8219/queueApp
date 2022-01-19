const LOADING = "LOADING";
const LOAD_COMPLETE = "LOAD_COMPLETE";
const GET_TASKS = "GET_TASKS";
const GET_TASK = "GET_TASK";
const GET_PROJECTS = "GET_PROJECTS";
const DELETE_PROJECTS = "DELETE_PROJECTS";
const FILTER_PROJECTS = "FILTER_PROJECTS";
const SHOW_ALL = "SHOW_ALL";

const initialState = {
  tasks: [],
  filtered: [],
  task: null,
  projects: [],
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
        filtered: [...action.payload],
        isLoading: false,
      };
    case GET_TASK:
      return {
        ...state,
        isLoading: false,
        task: action.payload,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: [...action.payload],
        isLoading: false,
      };
    case DELETE_PROJECTS:
      return {
        ...state,
        projects: [],
      };
    case SHOW_ALL:
      return state;

    case FILTER_PROJECTS:
      if (action.payload === "All Projects") {
        return {
          ...state,
          filtered: [...state.tasks],
        };
      } else {
        return {
          ...state,

          filtered: state.tasks.filter(
            (item) => item.project.name === action.payload
          ),
        };
      }

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
export const getProjects = (payload) => ({ type: GET_PROJECTS, payload });
export const deleteProjects = () => ({ type: DELETE_PROJECTS });
export const filterTasks = (payload) => ({ type: FILTER_PROJECTS, payload });
export const showAll = () => ({ type: SHOW_ALL });
export const loading = () => ({ type: LOADING });
export const load_complete = () => ({ type: LOAD_COMPLETE });