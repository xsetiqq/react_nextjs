"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartPopup from "./CartPopup";
import { RootState } from "@/redux/store";

export default function CartHandler() {
  const [visible, setVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.ui.isCartOpen);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  if (!hasMounted) return null;

  return <CartPopup visible={visible} />;
}
