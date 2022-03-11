import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';

const reducer = combineReducers({
  auth: authReducer,
});

export default reducer;
