import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import uiReducer from './ui';

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export default reducer;
