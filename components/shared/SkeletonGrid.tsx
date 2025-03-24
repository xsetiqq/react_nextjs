import React from "react";

export default function SkeletonGrid() {
  return (
    <section className="p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Все кроссовки
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 p-3 sm:p-4 animate-pulse space-y-3 sm:space-y-4"
          >
            <div className="h-24 sm:h-32 bg-gray-200 rounded-lg" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-5 bg-gray-200 rounded w-1/4 ml-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}
