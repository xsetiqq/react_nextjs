import { configureStore } from "@reduxjs/toolkit";
import { sneakersApi } from "./sneakersApi";
import favoritesReducer from "./favoritesSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    [sneakersApi.reducerPath]: sneakersApi.reducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sneakersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
