"use client";

interface Props {
  searchValue: string;
  sortOrder: "asc" | "desc";
  minPrice: number;
  maxPrice: number;
  onSearchChange: (value: string) => void;
  onSortChange: (order: "asc" | "desc") => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

export default function FilterPanel({
  searchValue,
  sortOrder,
  minPrice,
  maxPrice,
  onSearchChange,
  onSortChange,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 mb-4 sm:mb-6 pb-3 ">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Find your sneakers..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />
        </div>

        <div className="flex gap-4 w-full md:w-1/3">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 font-medium mb-1">
              Price from:
            </label>
            <input
              type="text"
              placeholder="from"
              value={minPrice.toString()}
              onChange={(e) => {
                const raw = e.target.value.replace(/^0+(?!$)/, "");
                const numeric = raw.replace(/\D/g, "");
                onMinPriceChange(Number(numeric));
              }}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              min={0}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 font-medium mb-1">
              to:
            </label>
            <input
              type="text"
              placeholder="to"
              value={maxPrice.toString()}
              onChange={(e) => {
                const raw = e.target.value.replace(/^0+(?!$)/, "");
                const numeric = raw.replace(/\D/g, "");
                onMaxPriceChange(Number(numeric));
              }}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              min={0}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
            className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          >
            <option value="asc">The cheap ones first</option>
            <option value="desc">The expensive ones first</option>
          </select>
        </div>
      </div>
    </div>
  );
}
