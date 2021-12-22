import api from "../../http";
import {
  getSettings,
  loading,
  loading_end,
  saveSettings,
} from "../settingsReducer";

export const getAllSettingsFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/settings")
      .then((response) => {
        console.log(response);
        dispatch(getSettings(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};

export const saveAllSettings = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(loading());
    api
      .post("/settings/create", { ...data })
      .then((response) => {
        //console.log(response.data);
        dispatch(saveSettings(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(loading_end());
      });
  };
};
