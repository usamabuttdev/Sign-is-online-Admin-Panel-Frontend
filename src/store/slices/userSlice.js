import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      const user = { ...action.payload };
      user.displayName =
        user?.displayName ||
        user?.name ||
        [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
        user?.email ||
        '';
      state.user = user;
    },
    logout: (state) => {
      localStorage.clear();
      sessionStorage.removeItem('accessToken');
      state.user = null;
    },
  },
});

// Exporting actions
export const { setUser, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
// Exporting the reducer
export default userSlice.reducer;
