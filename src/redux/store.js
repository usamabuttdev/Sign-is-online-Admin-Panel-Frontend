// // redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice'; // Importing the userSlice reducer
// import rootReducer from './rootReducer';


// // Combine reducers
// const rootReducer = {
//   user: userReducer,
//   // Other reducers go here...
// };

// // Create the Redux store
// const store = configureStore({
//   reducer: rootReducer,
//   // Other store configurations go here...
// });

// export default store;

// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // ... other store configurations
});

export default store;
