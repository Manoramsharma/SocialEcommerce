import {combineReducers} from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import profile from './profileReducer'
import categoryReducer from './categoryReducer'
import product from './productReducer'
export default combineReducers({
    category: categoryReducer,
    auth,
    alert,
    profile,
    product
})