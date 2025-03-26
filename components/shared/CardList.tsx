"use client";

import { useState } from "react";
import { useGetSneakersQuery } from "@/redux/sneakersApi";
import ProductCard from "./ProductCard";
import FilterPanel from "./FilterPanel";
import SkeletonGrid from "./SkeletonGrid";

export default function CardList() {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const { data = [], isLoading } = useGetSneakersQuery();

  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((item) => item.price >= minPrice && item.price <= maxPrice)
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <section className="p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold ">All sneakers</h2>
      <FilterPanel
        searchValue={searchValue}
        sortOrder={sortOrder}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSearchChange={setSearchValue}
        onSortChange={setSortOrder}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />

      {isLoading ? (
        <SkeletonGrid />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((item) => (
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
    </section>
  );
}
