import { configureStore } from '@reduxjs/toolkit';
import Auth from './reducers/auth';
import HomeReducer from './reducers/HomeReducer';

export const store = configureStore({
  reducer: {
    Auth,
    HomeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
