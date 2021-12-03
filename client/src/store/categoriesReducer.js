const GET_CATEGORIES = "GET_CATEGORIES";
const CREATE_CATEGORY = "CREATE_CATEGORY";
const FILTER_CATEGORIES = "FILTER_CATEGORIES";
const START_LOAD = "START_LOAD";
const END_LOAD = "END_LOAD";

const initialState = {
  loading: false,
  categories: [],
  errors: null,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOAD:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
        loading: false,
      };
    case CREATE_CATEGORY:
      const temp = { ...state };
      temp.categories.push(action.payload);
      return {
        ...state,
        categories: [...temp.categories],
        loading: true,
      };
    case FILTER_CATEGORIES: {
      const filterCat = state.categories.filter(
        (category) => category._id !== action.payload
      );
      return {
        ...state,
        categories: [...filterCat],
        loading: false,
      };
    }
    case END_LOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const getCategories = (payload) => ({ type: GET_CATEGORIES, payload });
export const createCategory = (payload) => ({ type: CREATE_CATEGORY, payload });
export const startLoading = () => ({ type: START_LOAD });
export const endLoading = () => ({ type: END_LOAD });
export const filterCategories = (payload) => ({
  type: FILTER_CATEGORIES,
  payload,
});
