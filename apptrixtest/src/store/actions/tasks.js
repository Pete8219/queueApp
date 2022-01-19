import api from "../../http";
import {
  loading,
  load_complete,
  getTasks,
  filterTasks,
  showAll,
} from "../taskReducer";

export const getTasksFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/api/issues?fields=id,summary,project(name)")
      .then((response) => {
        dispatch(getTasks(response.data));
      })
      .catch((error) => {
        dispatch(load_complete());
        console.log(error.response);
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

export const filterByProject = (filter) => {
  return (dispatch) => {
    dispatch(filterTasks(filter));
  };
};
