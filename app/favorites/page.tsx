"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetSneakersQuery } from "@/redux/sneakersApi";
import ProductCard from "@/components/shared/ProductCard";
import SkeletonGrid from "@/components/shared/SkeletonGrid";

export default function FavoritesPage() {
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  );
  const { data = [], isLoading } = useGetSneakersQuery();

  const favoriteSneakers = data.filter((item) => favoriteIds.includes(item.id));

  return (
    <div>
      {/* Заголовок + Назад */}
      <div className="flex items-center gap-5 mb-6">
        <Link
          href="/"
          className="w-[35px] h-[35px] flex items-center justify-center bg-white rounded-xl hover:bg-gray-200 transition border border-gray-200"
        >
          <ChevronLeft size={18} className="text-gray-400" />
        </Link>
        <h1 className="text-2xl font-black">Favorite</h1>
      </div>

      {/* Карточки */}
      {isLoading ? (
        <SkeletonGrid />
      ) : favoriteSneakers.length === 0 ? (
        <p className="text-gray-500">
          You don&apos;t have any favorite products yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteSneakers.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
