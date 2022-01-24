import api from "../../http";
import {
  filterCategories,
  getCategories,
  loading,
  createCategory,
  load_complete,
  editCategory,
} from "../categoriesReducer";

export const getCategoriesFromApi = () => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get("/categories")
      .then((response) => {
        dispatch(getCategories(response.data));
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

export const addCategory = (data) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .post("/categories/create", { data })
      .then((response) => {
        dispatch(createCategory(response.data));
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

export const updateCategory = (data) => {
  const { id, title } = data;
  return (dispatch) => {
    dispatch(loading());
    api
      .patch(`/categories/${id}`, { title })
      .then((response) => {
        dispatch(editCategory(response.data));
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

export const deleteCategory = (id) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .delete(`/categories/${id}`)
      .then(() => {
        dispatch(filterCategories(id));
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
