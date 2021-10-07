import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import productReducer from "./ProductReducer";
import checkoutReducer from "./CheckoutReducer";

export default combineReducers({
  authReducer,
  productReducer,
  checkoutReducer,
});
