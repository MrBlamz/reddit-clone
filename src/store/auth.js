import { createSelector, createSlice } from '@reduxjs/toolkit';

export const USER_DATA = {
  username: 'Redditor',
  votes: {
    posts: {},
    comments: {},
  },
  following: {
    communities: {},
  },
};

const initialState = {
  isLoggedIn: false,
  user: null,
  userData: USER_DATA,
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

    addCommentVote: (state, action) => {
      const { vote, commentId } = action.payload;
      state.userData.votes.comments = {
        ...state.userData.votes.comments,
        [commentId]: vote,
      };
    },

    deleteCommentVote: (state, action) => {
      const { commentId } = action.payload;
      delete state.userData.votes.comments[commentId];
    },

    followCommunity: (state, action) => {
      const { communityId } = action.payload;
      state.userData.following.communities = {
        ...state.userData.following.communities,
        [communityId]: true,
      };
    },

    unfollowCommunity: (state, action) => {
      const { communityId } = action.payload;
      delete state.userData.following.communities[communityId];
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

export const selectFollowingCommunity = (communityId) =>
  createSelector(
    (state) => state.auth.userData,
    (userData) => userData.following.communities[communityId]
  );

export const selectFollowingCommunities = createSelector(
  (state) => state.auth.userData,
  (userData) => Object.keys(userData.following.communities)
);

export const selectPostVote = (postId) =>
  createSelector(
    (state) => state.auth.userData,
    (userData) => userData.votes.posts[postId]
  );

export const selectCommentVote = (commentId) =>
  createSelector(
    (state) => state.auth.userData,
    (userData) => userData.votes.comments[commentId]
  );

export default authSlice.reducer;
