import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./Reducer/products";
import { authApi } from "./Reducer/auth";
import userReducer from "./slices/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersApi } from "./Reducer/users";
import { FaqsApi } from "./Reducer/faqs";
import { adminSettingsApi } from "./Reducer/adminSetting";
import { adminSupportApi } from "./Reducer/adminSupport";
import { contactApi } from "./Reducer/contact";
import { customersApi } from "./Reducer/customers";
import { specializationApi } from "./Reducer/specializations";
import { trainerApi } from "./Reducer/trainers";
import { trainingModeApi } from "./Reducer/training-modes";
import { languageApi } from "./Reducer/languages";
import { bookingApi } from "./Reducer/bookings";
import { transactionApi } from "./Reducer/transactions";
import { dashboardApi } from "./Reducer/dashboard";
import { fileApi } from "./Reducer/file";
import { platformsApi } from "./Reducer/platforms";
import { accountsApi } from "./Reducer/accounts";
import { apisApi } from "./Reducer/apis";
import { chargesApi } from "./Reducer/charges";
import { devicesApi } from "./Reducer/devices";
import { historyApi } from "./Reducer/history";
import { locationsApi } from "./Reducer/locations";
import { metricsApi } from "./Reducer/metrics";
import { salesApi } from "./Reducer/sales";
import { scriptsApi } from "./Reducer/scripts";

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user'],
};

// Create a persisted reducer for the user slice
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Create the Redux store with the persisted reducer for the user slice
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [FaqsApi.reducerPath]: FaqsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [adminSettingsApi.reducerPath]: adminSettingsApi.reducer,
    [adminSupportApi.reducerPath]: adminSupportApi.reducer,
    [trainerApi.reducerPath]: trainerApi.reducer,
    [specializationApi.reducerPath]: specializationApi.reducer,
    [trainingModeApi.reducerPath]: trainingModeApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [apisApi.reducerPath]: apisApi.reducer,
    [chargesApi.reducerPath]: chargesApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
    [platformsApi.reducerPath]: platformsApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [scriptsApi.reducerPath]: scriptsApi.reducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }).concat(
      // productsApi.middleware,
      FaqsApi.middleware,
      contactApi.middleware,
      customersApi.middleware,
      adminSettingsApi.middleware,
      adminSupportApi.middleware,
      usersApi.middleware,
      trainerApi.middleware,
      specializationApi.middleware,
      trainingModeApi.middleware,
      languageApi.middleware,
      bookingApi.middleware,
      transactionApi.middleware,
      dashboardApi.middleware,  
      authApi.middleware, 
      fileApi.middleware,
      accountsApi.middleware,
      apisApi.middleware,
      chargesApi.middleware,
      devicesApi.middleware,
      historyApi.middleware,
      locationsApi.middleware,
      metricsApi.middleware,
      platformsApi.middleware,
      salesApi.middleware,
      scriptsApi.middleware,
    ),
});

// Initialize Redux Persist
export const persistor = persistStore(store);

// Setup listeners
setupListeners(store.dispatch);
