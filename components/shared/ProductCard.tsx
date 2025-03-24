"use client";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";

interface Props {
  title: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ title, price, imageUrl }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 relative hover:shadow-md transition">
      <button className="absolute top-4 left-4 text-gray-400 hover:text-red-500">
        <Heart size={20} />
      </button>

      <div className="mb-4 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={title}
          width={150}
          height={100}
          className="object-contain"
        />
      </div>

      <h3 className="text-sm font-medium leading-tight mb-2">
        Mens Sneakers <br />
        {title}
      </h3>

      <div className="flex items-center justify-between mt-2">
        <div>
          <div className="text-xs text-gray-400">PRICE:</div>
          <div className="text-base font-bold">{price} $</div>
        </div>
        <button className="border border-gray-300 rounded-lg p-1 hover:bg-gray-100">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
