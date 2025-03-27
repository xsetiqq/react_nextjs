"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/redux/favoritesSlice";
import { RootState } from "@/redux/store";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, title, price, imageUrl }: Props) {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteIds.includes(id)
  );

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div
      className={`rounded-2xl p-4 relative hover:shadow-md transition ${
        cartItem ? "border-amber-200 bg-amber-50" : "border-gray-200"
      } border`}
    >
      <button
        onClick={handleToggleFavorite}
        className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition"
      >
        <Heart
          size={20}
          className={`transition cursor-pointer 
    ${
      isFavorite
        ? "fill-red-500 text-red-500 hover:text-red-900 hover:fill-red-900"
        : "text-gray-400 hover:text-red-500 hover:fill-red-500"
    }
  `}
        />
      </button>
      <Link href={`/product/${id}`} className="block">
        <div className="mb-4 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={title}
            width={150}
            height={100}
            className="object-contain"
          />
        </div>

        <h3 className="text-sm font-medium leading-tight mb-2">{title}</h3>
      </Link>
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="text-xs text-gray-400">PRICE:</div>
          <div className="text-base font-bold">{price} $</div>
        </div>

        {cartItem ? (
          <div className="flex gap-2 sm:ml-auto sm:justify-end ">
            <button
              onClick={() => {
                if (cartItem.quantity === 1) {
                  dispatch(removeFromCart(id));
                } else {
                  dispatch(decreaseQuantity(id));
                }
              }}
              className="border px-2 rounded hover:bg-gray-100 text-gray-600"
            >
              –
            </button>
            <span className="text-sm pt-0.5">{cartItem.quantity}</span>
            <button
              onClick={() => dispatch(increaseQuantity(id))}
              className="border px-2 rounded hover:bg-gray-100 text-gray-600"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              dispatch(addToCart(id));
              window.dispatchEvent(new Event("cart-popup"));
            }}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <Plus
              size={16}
              className="text-gray-400 hover:text-red-500 hover:fill-red-500 items-center"
            />
          </button>
        )}
      </div>
    </div>
  );
}
