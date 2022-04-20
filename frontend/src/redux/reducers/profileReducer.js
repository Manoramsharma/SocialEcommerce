import { PROFILE_TYPES } from "../actions/profileAction";
import { EditData } from "../actions/globalTypes";
const initialState = {
  loading: false,
  ids: [],
  users: [],
  product: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload.username, action.payload),
      };
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload.username, action.payload),
      };
    case PROFILE_TYPES.RATING:
      return {
        ...state,
        users: EditData(state.users, action.payload.username, action.payload),
      };
    case PROFILE_TYPES.GETPRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload.product],
      };
    default:
      return state;
  }
};
export default profileReducer;
