import api from "../../http";
import {
  loading,
  load_complete,
  getTasks,
  filterTasks,
  showAll,
  getProjects,
  deleteProjects,
  getWorkItems,
} from "../taskReducer";

export const getTasksFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/api/issues?fields=id,summary,project(id,name)")
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

export const getProjectsFromApi = (value) => {
  return (dispatch) => {
    api
      .get(
        `/api/issues?fields=id,summary,project(name)&query=project:+ ${value}*`
      )
      .then((response) => {
        dispatch(getProjects(response.data));
      })
      .catch((error) => {
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

export const getWorkItemsFromApi = (taskId) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get(
        `/api/issues/${taskId}/timeTracking/workItems/?fields=id,creator(name),text,duration(minutes)`
      )
      .then((response) => {
        dispatch(getWorkItems(response.data));
      })
      .catch((error) => {
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

export const clearProjectsList = () => {
  return (dispatch) => {
    dispatch(deleteProjects());
  };
};

//Тестовый запрос к существующей задаче, чтобы получить workItems

export const getTestWorkItemsFromApi = (taskId) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get(
        `/api/issues/SNBX-1/timeTracking/workItems/?fields=id,text,creator(name),duration(minutes)`
      )
      .then((response) => {
        dispatch(getWorkItems(response.data));
      })
      .catch((error) => {
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};
