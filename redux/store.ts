import { configureStore } from "@reduxjs/toolkit";
import { sneakersApi } from "./sneakersApi";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import uiReducer from "./uiSlice";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "@/utils/localStorage";

const preloadedCart = loadCartFromLocalStorage();

export const store = configureStore({
  reducer: {
    [sneakersApi.reducerPath]: sneakersApi.reducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
  },
  preloadedState: {
    cart: preloadedCart || { items: [] },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sneakersApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
