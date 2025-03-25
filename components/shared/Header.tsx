import React from "react";
import Image from "next/image";
import { Container } from "./Bontainer";
import { CircleUserRound, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-500">
      <Container className="flex items-center justify-between py-8">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/icons/snikersIcon.png"
            alt="snikersIcon"
            width={40}
            height={40}
          />
          <div>
            <h1 className="text-2xl uppercase font-bold">React Snikers</h1>
            <p className="text-sm leading-3 font-normal text-gray-500">
              Store for the best sneakers
            </p>
          </div>
        </Link>

        <ul className="flex items-center gap-10">
          <Link
            href="/cart"
            className="flex text-gray-500 items-center gap-2 cursor-pointer hover:text-black"
          >
            <ShoppingCart color="#6a7282" />
            300 $
          </Link>

          <Link
            href="/favorites"
            className="flex text-gray-500 gap-2 cursor-pointer items-center hover:text-black"
          >
            <Heart color="#6a7282" />
            <p>Favorite</p>
          </Link>

          <Link
            href="/404"
            className="flex  text-gray-500 gap-2 cursor-pointer items-center hover:text-black"
          >
            <CircleUserRound color="#6a7282" />
            <p>Profile</p>
          </Link>
        </ul>
      </Container>
    </header>
  );
}
