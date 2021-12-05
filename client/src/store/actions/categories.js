import api from "../../http";
import {
  filterCategories,
  getCategories,
  startLoading,
  createCategory,
  endLoading,
  editCategory,
} from "../categoriesReducer";

export const getCategoriesFromApi = () => {
  return (dispatch) => {
    dispatch(startLoading());
    api
      .get("/categories")
      .then((response) => {
        dispatch(getCategories(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const addCategory = (data) => {
  
  return (dispatch) => {
    dispatch(startLoading());
    api
      .post("/categories/create", { data })
      .then((response) => {
         dispatch(createCategory(response.data));
      })
      .then(() => dispatch(endLoading()))
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const updateCategory = (data) => {
  
  const {id, title} = data
  return (dispatch) => {
    dispatch(startLoading())
    api.patch(`/categories/${id}`, {title})
    .then( (response) => {
      dispatch(editCategory(response.data))
    })
    .catch( error => {
      console.log(error.response)
    })
  }
}

export const deleteCategory = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    api
      .delete(`/categories/${id}`)
      .then(() => {
        dispatch(filterCategories(id));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
