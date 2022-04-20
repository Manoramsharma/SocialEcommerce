import { PRODUCT_TYPES } from "../actions/productAction";
const initialState = {
  whatsnew: [],
  allproducts: [],
  buyproduct: [],
  /*  likeproduct: [], */
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TYPES.WHATSNEW:
      return {
        ...state,
        whatsnew: action.payload,
      };
    case PRODUCT_TYPES.ALLPRODUCTS:
      return {
        ...state,
        allproducts: action.payload,
      };
    case PRODUCT_TYPES.BUYPRODUCT:
      return {
        ...state,
        buyproduct: action.payload,
      };
    /*   case PRODUCT_TYPES.LIKEPRODUCT:
      return {
        ...state,
        likeproduct: action.payload,
      }; */
    default:
      return state;
  }
};
export default productReducer;
