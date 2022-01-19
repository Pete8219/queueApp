import api from "../../http";
import { loading, load_complete, getTasks } from "../taskReducer";

export const getTasksFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/api/issues?fields=id,summary,project(name)")
      .then((response) => {
        console.log(response.data);
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
