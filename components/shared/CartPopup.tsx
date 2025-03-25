"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetSneakersQuery } from "@/redux/sneakersApi";
import { openCart } from "@/redux/uiSlice";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Props {
  visible: boolean;
}

export default function CartPopup({ visible }: Props) {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data = [] } = useGetSneakersQuery();

  const total = cartItems.reduce((sum, item) => {
    const product = data.find((p) => p.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  if (!visible || totalCount === 0) return null;

  return isMobile ? (
    // 🟢 Mobile circle popup
    <button
      onClick={() => dispatch(openCart())}
      className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
    >
      <div className="relative">
        <ShoppingCart size={22} />
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {totalCount}
          </span>
        )}
      </div>
    </button>
  ) : (
    // 🖥️ Desktop popup box
    <div
      className={`fixed bottom-6 left-6 z-50 w-[300px] bg-white border border-gray-200 rounded-xl shadow-lg p-4 transition-all duration-300
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
    >
      <p className="text-sm text-gray-600 mb-1">
        <b>{totalCount}</b> items in cart
      </p>
      <p className="text-lg font-semibold mb-4">Total: {total} $</p>
      <button
        onClick={() => dispatch(openCart())}
        className="w-full bg-black hover:bg-lime-600 text-white py-2 rounded text-sm font-medium transition"
      >
        Go to cart →
      </button>
    </div>
  );
}
