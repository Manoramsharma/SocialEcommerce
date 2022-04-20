import { getDataAPI, patchDataAPI, postDataAPI, deleteDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES, DeleteData } from "./globalTypes";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GETPRODUCT: "GETPRODUCT",
};
export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user.username !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataAPI(`/user/${id}`, auth.token);
        const res2 = await getDataAPI(`/product/${id}`, auth.token);
        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: res.data,
        });
        dispatch({
          type: PROFILE_TYPES.GETPRODUCT,
          payload: res2.data,
        });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        console.log(err);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.message },
        });
      }
    }
  };

export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    var newUser = { ...user, followers: [...user.followers, auth.user] };
    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: newUser,
    });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: [...auth.user.following, newUser],
        },
      },
    });
    try {
      const res = await patchDataAPI(`/user/${user._id}/follow`, null, auth.token);
      /*       console.log(res);
       */
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

export const unfollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    var newUser = {
      ...user,
      followers: DeleteData(user.followers, auth.user.username),
    };

    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser.username),
        },
      },
    });
    try {
      await patchDataAPI(`/user/${user._id}/unfollow`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

export const rating =
  ({ users, user, auth, rate, id }) =>
  async (dispatch) => {
    var newUser = { ...user, rating: [...user.rating, auth.user] };
    dispatch({
      type: PROFILE_TYPES.RATING,
      payload: newUser,
    });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          rating: [...auth.user.rating, newUser],
        },
      },
    });
    try {
      const res = await patchDataAPI(`/user/rating/${id}/${rate}`, null, auth.token);
      /*       console.log(res);
       */
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

export const updateQuantity =
  ({ data, id, quantity, auth, size }) =>
  async (dispatch) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].product._id === id) {
        data[i].quantity = parseInt(quantity);
      }
    }
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          cart: data,
        },
      },
    });
    try {
      const res = await postDataAPI(`/cart/update/${id}/${quantity}/${size}`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteQuantity =
  ({ data, id, auth, size }) =>
  async (dispatch) => {
    var newData = data.filter(function (item) {
      return item.product._id !== id;
    });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          cart: newData,
        },
      },
    });
    try {
      const res = await postDataAPI(`/cart/update/${id}/0/${size}`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUnreadNotifications =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(`user/deleteunreadnotifications`, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

export const addToCart =
  ({ size, id, quantity, auth }) =>
  async (dispatch) => {
    try {
      const result = await postDataAPI(`/cart/update/${id}/${quantity}/${size}`, null, auth.token);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            cart: result.data,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const addToWishlist =
  ({ size, id, quantity, auth }) =>
  async (dispatch) => {
    try {
      const result = await postDataAPI(`/cart/update/${id}/${quantity}/${size}`, null, auth.token);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            cart: result.data,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateRating =
  ({ rating, auth }) =>
  async (dispatch) => {
    /*     console.log(rating);
     */
  };
export const deleteProduct =
  ({ products, auth, _id }) =>
  async (dispatch) => {
    products = products.filter((item) => item._id != _id);
    dispatch({
      type: PROFILE_TYPES.GETPRODUCT,
      payload: {
        product: products,
      },
    });
    try {
      const res = await deleteDataAPI(`product/${_id}`, auth.token);
    } catch (error) {
      console.log(error);
    }
  };
