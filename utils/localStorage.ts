import type { CartState } from "@/types/cartsType";

export const loadCartFromLocalStorage = (): CartState | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const serializedCart = localStorage.getItem("cart");
    if (!serializedCart) return undefined;
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Ошибка загрузки корзины:", e);
    return undefined;
  }
};

export const saveCartToLocalStorage = (state: CartState): void => {
  if (typeof window === "undefined") return;

  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("cart", serialized);
  } catch (e) {
    console.warn("Ошибка сохранения корзины:", e);
  }
};
