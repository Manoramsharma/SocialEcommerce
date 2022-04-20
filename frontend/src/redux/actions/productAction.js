import { GLOBALTYPES } from "./globalTypes";
import { putDataAPI, postDataAPI, getDataAPI } from "../../utils/fetchData";
export const PRODUCT_TYPES = {
  WHATSNEW: "WHATSNEW",
  ALLPRODUCTS: "ALLPRODUCTS",
  BUYPRODUCT: "BUYPRODUCT",
  /*  LIKEPRODUCT: "LIKEPRODUCT", */
};
export const uploadProduct = (auth, data) => async (dispatch) => {
  try {
    console.log(data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await putDataAPI(`product`, data, auth.token);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
export const likeProduct =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI(`like/${id}`, null, auth.token);
      /*       console.log(res);
       */
    } catch (error) {
      console.log(error);
    }
  };
export const unlikeProduct =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI(`unlike/${id}`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

export const getProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await getDataAPI(`topProducts`);
    /*     console.log(res);
     */ dispatch({
      type: PRODUCT_TYPES.WHATSNEW,
      payload: res.data.product,
    });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await getDataAPI(`allproducts`);
    dispatch({
      type: PRODUCT_TYPES.ALLPRODUCTS,
      payload: res.data.result,
    });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (error) {
    console.log(error);
  }
};
export const byProductId = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await getDataAPI(`byproductid/${data}`);
    dispatch({
      type: PRODUCT_TYPES.BUYPRODUCT,
      payload: res.data.product,
    });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (error) {
    console.log(error);
  }
};
