import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginApi } from '../features/login/LoginApi';
import { registerApi } from '../features/register/RegisterApi';
import { usersAPI } from '../features/users_management/UsersApi';
import { LocationAPI } from '../features/location/LocationApi';
import { customerAPI } from '../features/customer_support_tickets/CustomerApi';
import { FleetAPI } from '../features/fleet_Management/FleetAPI';
//auth persist config
const persistConfig = {
  key: 'auth',
  storage,
}

//combine all reducers
const rootReducer = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  [registerApi.reducerPath]:registerApi.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [LocationAPI.reducerPath]:LocationAPI.reducer,
  [customerAPI.reducerPath]:customerAPI.reducer,
 [FleetAPI.reducerPath]:FleetAPI.reducer,
});

//apply pesist Reducer to only counter reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:['persist/PERSIST','persist/REHYDRATE'],
      },
    }).concat(loginApi.middleware).concat(registerApi.middleware)
    .concat(usersAPI.middleware).concat(LocationAPI.middleware).concat(customerAPI.middleware)
    .concat(FleetAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;