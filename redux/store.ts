import { configureStore } from "@reduxjs/toolkit";
import { sneakersApi } from "./sneakersApi"; // мы создадим это ниже

export const store = configureStore({
  reducer: {
    [sneakersApi.reducerPath]: sneakersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sneakersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
