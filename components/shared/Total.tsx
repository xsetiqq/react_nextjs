"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetSneakersQuery } from "@/redux/sneakersApi";

export default function CartTotal() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data = [] } = useGetSneakersQuery();

  const total = cartItems.reduce((sum, item) => {
    const product = data.find((p) => p.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return <b>{total}</b>;
}
