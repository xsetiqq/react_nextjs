"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCart } from "@/redux/uiSlice";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/cartSlice";
import { useGetSneakersQuery } from "@/redux/sneakersApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isCartOpen);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data = [] } = useGetSneakersQuery();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen && cartItems.length > 0) {
      window.dispatchEvent(new Event("cart-popup"));
    }
  }, [isOpen, cartItems]);

  if (!hasMounted) return null;

  const total = cartItems.reduce((sum, item) => {
    const product = data.find((p) => p.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <>
      <div
        onClick={() => dispatch(closeCart())}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed top-0 right-0 w-[350px] h-full bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-gray-400 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="p-4 overflow-y-auto"
          style={{ height: "calc(100% - 160px)" }}
        >
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-sm">Your cart is empty</p>
          ) : (
            cartItems.map((item) => {
              const product = data.find((p) => p.id === item.id);
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-start mb-6"
                >
                  <div className="w-[70%]">
                    <p className="text-sm font-medium leading-tight">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 border rounded text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        –
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 border rounded text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-sm font-semibold">
                      {product.price * item.quantity} $
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="w-[24px] h-[24px] border border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Total:</span>
            <span className="text-base font-bold">{total} $</span>
          </div>
          <Link href="/cart">
            <button
              onClick={() => dispatch(closeCart())}
              className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded font-medium transition"
            >
              Place an order →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
