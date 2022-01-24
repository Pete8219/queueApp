import api from "../../http";
import {
  getSettings,
  loading,
  load_complete,
  saveSettings,
} from "../settingsReducer";

export const getAllSettingsFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/settings")
      .then((response) => {
        console.log(response.data);
        dispatch(getSettings(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};

export const saveAllSettings = (data) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .post("/settings/create", { ...data })
      .then((response) => {
        dispatch(saveSettings(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(load_complete());
      })
      .finally(() => {
        dispatch(load_complete());
      });
  };
};
