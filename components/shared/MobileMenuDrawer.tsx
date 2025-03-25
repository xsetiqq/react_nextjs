"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeMenu, openCart } from "@/redux/uiSlice";
import { X, ShoppingCart, Heart, CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function MobileMenuDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isMenuOpen);

  return (
    <div
      className={`fixed top-0 right-0 z-[100] h-full w-[260px] bg-white shadow-lg border-l border-gray-200 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-bold text-lg">Menu</h2>
        <button onClick={() => dispatch(closeMenu())}>
          <X />
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4 text-gray-800 text-sm">
        <button
          className="flex items-center gap-2 hover:text-black transition"
          onClick={() => {
            dispatch(closeMenu());
            dispatch(openCart());
          }}
        >
          <ShoppingCart size={18} />
          Cart
        </button>

        <Link
          href="/favorites"
          onClick={() => dispatch(closeMenu())}
          className="flex items-center gap-2 hover:text-black transition"
        >
          <Heart size={18} />
          Favorites
        </Link>

        <Link
          href="/profile"
          onClick={() => dispatch(closeMenu())}
          className="flex items-center gap-2 hover:text-black transition"
        >
          <CircleUserRound size={18} />
          Profile
        </Link>
      </div>
    </div>
  );
}
