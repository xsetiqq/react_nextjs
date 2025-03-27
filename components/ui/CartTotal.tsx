"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function CartTotal() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  return <span>{total}</span>;
}
