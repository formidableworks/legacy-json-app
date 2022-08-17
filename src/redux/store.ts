import { configureStore } from '@reduxjs/toolkit';
import { dashcoreApi } from './api/dashcoreApi';

export const store = configureStore({
  reducer: {
    [dashcoreApi.reducerPath]: dashcoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dashcoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
