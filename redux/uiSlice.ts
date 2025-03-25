import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isCartOpen: boolean;
  isMenuOpen: boolean;
}

const initialState: UIState = {
  isCartOpen: false,
  isMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

export const { openCart, closeCart, openMenu, closeMenu } = uiSlice.actions;
export default uiSlice.reducer;
