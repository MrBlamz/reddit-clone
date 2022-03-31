import { createSelector, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    userData: {},
  },
  reducers: {
    fetchUserFromLocalStorage: (state, action) => {
      state.user = action.payload.user;
      state.userData = action.payload.userData;
      state.isLoggedIn = true;
    },

    login: (state, action) => {
      state.user = action.payload.user;
      state.userData = action.payload.userData;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.userData = {};
      state.isLoggedIn = false;
    },
  },
});

export const actions = authSlice.actions;

// Selectors
export const selectAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth.isLoggedIn
);

export const selectUsername = createSelector(
  (state) => state.auth,
  (auth) => auth.userData.username
);

export const selectUserId = createSelector(
  (state) => state.auth,
  (auth) => auth.user?.uid
);

export default authSlice.reducer;
