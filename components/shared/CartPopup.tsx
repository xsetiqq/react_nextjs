"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetSneakersQuery } from "@/redux/sneakersApi";
import { openCart } from "@/redux/uiSlice";

interface Props {
  visible: boolean;
}

export default function CartPopup({ visible }: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data = [] } = useGetSneakersQuery();

  const total = cartItems.reduce((sum, item) => {
    const product = data.find((p) => p.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 w-[300px] bg-white border border-gray-200 rounded-xl shadow-lg p-4 transition-all duration-300
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
      `}
    >
      <p className="text-sm text-gray-600 mb-1">
        There are <b>{totalCount}</b> items in the cart
      </p>
      <p className="text-lg font-semibold mb-4">Amount: {total} $</p>
      <button
        onClick={() => dispatch(openCart())}
        className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded text-sm font-medium transition"
      >
        To cart →
      </button>
    </div>
  );
}
