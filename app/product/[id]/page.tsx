"use client";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {
  useGetSneakerByIdQuery,
  useGetSneakersQuery,
} from "@/redux/sneakersApi";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { toggleFavorite } from "@/redux/favoritesSlice";
import { RootState } from "@/redux/store";
import { ChevronLeft, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { data: relatedProducts = [] } = useGetSneakersQuery();

  const {
    data: product,
    isLoading,
    error,
  } = useGetSneakerByIdQuery(id as string);

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteIds.includes(Number(id))
  );

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === Number(id))
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Image
          className=""
          src="/loading.svg"
          alt="loading"
          width={50}
          height={40}
        />
      </div>
    );

  if (error || !product)
    return <div className="p-6 text-red-500">Item not found</div>;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product.id));
    }
    window.dispatchEvent(new Event("cart-popup"));
    toast.success("Item added to cart");
  };

  return (
    <>
      <Link
        href="/"
        className="
       w-[35px] h-[35px] flex items-center justify-center bg-gray-200 rounded-xl hover:bg-gray-200 transition border border-gray-500"
      >
        <ChevronLeft size={18} className="text-gray-400" />
      </Link>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex justify-center items-center flex-1">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={450}
              height={450}
              className="rounded-2xl border shadow-md object-contain"
            />
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm uppercase text-gray-400 tracking-wide">
              Men&apos;s Sneakers
            </p>
            <h1 className="text-3xl font-extrabold">{product.title}</h1>
            <p className="text-xl text-gray-800 font-semibold">
              ${product.price}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-gray-500">Quantity:</span>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                –
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Total: ${product.price} × {quantity} ={" "}
              <span className="font-semibold">${product.price * quantity}</span>
            </p>

            <div className="flex flex-col gap-2 mt-6">
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Add to cart
                </button>

                <button
                  onClick={() => dispatch(toggleFavorite(product.id))}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isFavorite ? "Favorites" : "Add Favorite"}
                </button>
              </div>

              {cartItem && (
                <p className="text-sm text-green-600 flex items-center gap-1 pl-[2px]">
                  <ShoppingCart size={16} /> The item is already in your cart
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-10 border-gray-200" />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
        </div>
      </div>
    </>
  );
}
