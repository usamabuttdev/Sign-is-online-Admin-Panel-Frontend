// redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  // ... other reducers
});

export default rootReducer;
