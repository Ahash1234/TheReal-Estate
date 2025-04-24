import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  favorites: [], // Add favorites array to the initial state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addToFavorites: (state, action) => {
      // Ensure favorites array is defined before adding and prevent duplicates
      const normalizedPayload = action.payload.toString();
      const normalizedFavorites = state.favorites.map(id => id.toString());
      if (state.favorites && !normalizedFavorites.includes(normalizedPayload)) {
        state.favorites = [...state.favorites, action.payload];
        console.log("Reducer addToFavorites called. Favorites updated:", state.favorites); // Debug log
      } else {
        console.log("Reducer addToFavorites called but item already in favorites:", action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      // Remove the listing ID from the favorites array
      const normalizedPayload = action.payload.toString();
      state.favorites = state.favorites.filter(id => id.toString() !== normalizedPayload);
      console.log("Reducer removeFromFavorites called. Favorites updated:", state.favorites); // Debug log
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
  addToFavorites, // Export the new action
  removeFromFavorites, // Export the remove action
} = userSlice.actions;

export default userSlice.reducer;
