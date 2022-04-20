import axios from "axios";

export const categoryConstansts = {
  GET_ALL_CATEGORY_REQUEST: "GET_ALL_CATEGORY_REQUEST",
  GET_ALL_CATEGORY_SUCCESS: "GET_ALL_CATEGORY_SUCCESS",
  GET_ALL_CATEGORY_FAILURE: "GET_ALL_CATEGORY_FAILURE",
};

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstansts.GET_ALL_CATEGORY_REQUEST });
    const res = await axios.get(`http://localhost:8000/api/category/getcategory`);
    /*   console.log(res); */
    if (res.status === 200) {
      const { categoryList } = res.data;

      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
