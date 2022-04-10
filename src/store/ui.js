import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticationModal: {
    isOpen: false,
    isLogin: true,
  },
  createCommunityModal: {
    isOpen: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeAuthenticationModalMode: (state) => {
      const { isLogin } = state.authenticationModal;
      state.authenticationModal.isLogin = !isLogin;
    },

    openLoginModal: (state) => {
      state.authenticationModal.isLogin = true;
      state.authenticationModal.isOpen = true;
    },

    openSignUpModal: (state) => {
      state.authenticationModal.isLogin = false;
      state.authenticationModal.isOpen = true;
    },

    closeAuthenticationModal: (state) => {
      state.authenticationModal.isOpen = false;
    },

    openCreateCommunityModal: (state) => {
      state.createCommunityModal.isOpen = true;
    },

    closeCreateCommunityModal: (state) => {
      state.createCommunityModal.isOpen = false;
    },
  },
});

const actions = uiSlice.actions;

// Action Creators
export const {
  changeAuthenticationModalMode,
  closeAuthenticationModal,
  openLoginModal,
  openSignUpModal,
  openCreateCommunityModal,
  closeCreateCommunityModal,
} = actions;

// Selectors
export const selectAuthenticationModalMode = createSelector(
  (state) => state.ui.authenticationModal,
  (authenticationModal) => authenticationModal.isLogin
);

export const selectAuthenticationModalStatus = createSelector(
  (state) => state.ui.authenticationModal,
  (authenticationModal) => authenticationModal.isOpen
);

export const selectCreateCommunityModalStatus = createSelector(
  (state) => state.ui.createCommunityModal,
  (createCommunityModal) => createCommunityModal.isOpen
);

export default uiSlice.reducer;
