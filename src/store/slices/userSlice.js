// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user', // The name of the slice
  initialState: {user:null}, // The initial state of the slice
  reducers: {
    
    setUser: (state, action) => {
      let user={...action.payload};
      user.displayName=`${user?.firstName} ${user?.lastName}`
      state.user=user;
    }, // Action to set the user in the state
    logout: (state) => {
      localStorage.clear();
     state.user=null
    }, // Action to clear the user from the state
  },
});

// Exporting actions
export const { setUser, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
// Exporting the reducer
export default userSlice.reducer;
