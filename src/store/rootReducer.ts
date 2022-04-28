import { combineReducers } from "redux";
//import recipeReducer from "./recipe/reducers";
import recipeReducer from "../store/recipe/Slices/recipeSlice";
import signupReducer from "../store/auth/signupSlice";
import loginReducer from "../store/auth/loginSlice";
export default combineReducers({
  recipes: recipeReducer,
  newUsers: signupReducer,
  user: loginReducer,
});
