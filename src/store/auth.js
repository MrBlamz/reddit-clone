import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  userData: {
    votes: {
      posts: {},
      comments: {},
    },
  },
};

const addUser = (state, action) => {
  state.user = action.payload.user;
  state.userData = action.payload.userData;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUserFromLocalStorage: addUser,

    login: addUser,

    logout: () => initialState,

    addPostVote: (state, action) => {
      const { vote, postId } = action.payload;
      state.userData.votes.posts = {
        ...state.userData.votes.posts,
        [postId]: vote,
      };
    },

    deletePostVote: (state, action) => {
      const { postId } = action.payload;
      delete state.userData.votes.posts[postId];
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

export const selectVote = (postId) =>
  createSelector(
    (state) => state.auth.userData,
    (userData) => userData.votes.posts[postId]
  );

export default authSlice.reducer;
