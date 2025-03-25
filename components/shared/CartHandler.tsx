"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartPopup from "./CartPopup";
import { RootState } from "@/redux/store";

export default function CartHandler() {
  const [visible, setVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // 💡 <== ключ

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.ui.isCartOpen);

  // ⏳ Отмечаем, что компонент отрендерился на клиенте
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // слушаем кастомное событие для показа CartPopup
  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener("cart-popup", show);
    return () => window.removeEventListener("cart-popup", show);
  }, []);

  useEffect(() => {
    if (isCartOpen || cartItems.length === 0) {
      setVisible(false);
    }
  }, [isCartOpen, cartItems]);

  // 💣 НИЧЕГО не рендерим до hydration
  if (!hasMounted) return null;

  return <CartPopup visible={visible} />;
}
