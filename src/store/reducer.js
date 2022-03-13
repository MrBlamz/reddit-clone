import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import uiReducer from './ui';
import dataReducer from './data';

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  data: dataReducer,
});

export default reducer;
