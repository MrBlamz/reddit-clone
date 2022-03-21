import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  comments: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    savePosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

// Action creators
export const { savePosts } = dataSlice.actions;

// Selectors
export const selectPosts = createSelector(
  (state) => state.data,
  (data) => data.posts
);

export const selectPost = (id) =>
  createSelector(
    (state) => state.data,
    (data) => data.posts.find((post) => post.id === id)
  );

export default dataSlice.reducer;
