"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetSneakersQuery } from "@/redux/sneakersApi";
import ProductCard from "@/components/shared/ProductCard";
import SkeletonGrid from "@/components/shared/SkeletonGrid";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data = [], isLoading } = useGetSneakersQuery();

  const cartSneakers = data.filter((item) =>
    cartItems.some((cartItem) => cartItem.id === item.id)
  );

  const total = cartItems.reduce((sum, item) => {
    const product = data.find((p) => p.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <div>
      <div className="flex items-center gap-5 mb-6">
        <Link
          href="/"
          className="w-[35px] h-[35px] flex items-center justify-center bg-white rounded-xl hover:bg-gray-200 transition border border-gray-200"
        >
          <ChevronLeft size={18} className="text-gray-400" />
        </Link>
        <h1 className="text-2xl font-black">Cart</h1>
      </div>

      {isLoading ? (
        <SkeletonGrid />
      ) : cartSneakers.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {cartSneakers.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-6">
            <p className="text-lg font-bold">
              Total: <span className="text-black">{total} $</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded transition text-sm">
                Proceed to Checkout
              </button>
              <button className="bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-100 transition text-sm">
                Register to Save Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
