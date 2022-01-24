const GET_CATEGORIES = "GET_CATEGORIES";
const CREATE_CATEGORY = "CREATE_CATEGORY";
const EDIT_CATEGORY = "EDIT_CATEGORY";
const FILTER_CATEGORIES = "FILTER_CATEGORIES";
const LOADING = "LOADING";
const LOAD_COMPLETE = "LOAD_COMPLETE";

const initialState = {
  isLoading: false,
  categories: [],
  errors: null,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
        isLoading: false,
      };
    case CREATE_CATEGORY:
      const temp = { ...state };
      temp.categories.push(action.payload);
      return {
        ...state,
        categories: [...temp.categories],
        isLoading: false,
      };
    case EDIT_CATEGORY:
      const newState = { ...state };
      newState.categories.forEach((item) => {
        if (item._id === action.payload._id) {
          item.title = action.payload.title;
        }
      });

      return {
        ...state,
        categories: [...newState.categories],
        isLoading: false,
      };
    case FILTER_CATEGORIES: {
      const filterCat = state.categories.filter(
        (category) => category._id !== action.payload
      );
      return {
        ...state,
        categories: [...filterCat],
        isLoading: false,
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

export const getCategories = (payload) => ({ type: GET_CATEGORIES, payload });
export const createCategory = (payload) => ({ type: CREATE_CATEGORY, payload });
export const editCategory = (payload) => ({ type: EDIT_CATEGORY, payload });
export const loading = () => ({ type: LOADING });
export const load_complete = () => ({ type: LOAD_COMPLETE });
export const filterCategories = (payload) => ({
  type: FILTER_CATEGORIES,
  payload,
});
