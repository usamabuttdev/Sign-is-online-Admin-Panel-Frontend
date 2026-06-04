// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user', // The name of the slice
  initialState: null, // The initial state of the slice
  reducers: {
    setUser: (state, action) => action.payload, // Action to set the user in the state
    clearUser: (state) => null, // Action to clear the user from the state
  },
});

// Exporting actions
export const { setUser, clearUser } = userSlice.actions;

// Exporting a selector to get user information from the state
export const selectUser = (state) => state.user;

// Exporting the reducer
export default userSlice.reducer;
