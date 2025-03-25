"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = ["/banner.png", "/banner2.png", "/banner3.png"];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [, setDirection] = useState<"left" | "right">("right");

  const slideTo = (newIndex: number, dir: "left" | "right") => {
    setDirection(dir);
    setIndex((newIndex + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      slideTo(index + 1, "right");
    }, 10000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-[3/1]">
      <div
        className={`w-full h-full flex transition-transform duration-700`}
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {banners.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            width={1280}
            height={400}
            className="w-full flex-shrink-0 object-contain
"
            priority={i === index}
          />
        ))}
      </div>

      {/* Кнопка влево */}
      <button
        onClick={() => slideTo(index - 1, "left")}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition z-10"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Кнопка вправо */}
      <button
        onClick={() => slideTo(index + 1, "right")}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition z-10"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
