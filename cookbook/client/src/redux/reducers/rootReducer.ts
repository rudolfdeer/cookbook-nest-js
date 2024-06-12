import { combineReducers } from 'redux';
import cookbooksReducer from './cookbooksReducer';
import recipesReducer from './recipesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  cookbooks: cookbooksReducer,
  user: userReducer,
});

export default rootReducer;
