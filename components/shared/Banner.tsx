import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="rounded-xl overflow-hidden">
      <Image
        src="/banner.png"
        alt="Sneakers Banner"
        width={1280}
        height={400}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
}
