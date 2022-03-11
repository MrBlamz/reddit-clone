import { createSelector, createSlice } from '@reduxjs/toolkit';
import { auth } from '../utils/firebase/auth';
import { fetchUserData } from '../utils/firebase/firestore';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.userData = action.payload.userData;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

const actions = authSlice.actions;

// Action Creators
export const listenForAuthChanges = () => (dispatch) =>
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      let userData;

      try {
        userData = await fetchUserData(user.uid);
      } catch (error) {
        userData = {};
      }

      dispatch(
        actions.login({
          user: user.toJSON(),
          userData,
        })
      );
    } else {
      dispatch(actions.logout());
    }
  });

// Selectors
export const selectAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth.isLoggedIn
);

export const selectUsername = createSelector(
  (state) => state.auth,
  (auth) => auth.userData.username
);

export default authSlice.reducer;
