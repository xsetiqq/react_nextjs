"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Container } from "./Bontainer";
import { CircleUserRound, Heart, Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import Total from "./Total";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-gray-500">
      <Container className="flex items-center justify-between py-8">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/icons/snikersIcon.png"
            alt="snikersIcon"
            width={50}
            height={50}
          />
          <div>
            <h1 className="text-2xl uppercase font-bold">SneakersPL</h1>
            <p className="text-sm leading-3 font-normal text-gray-500">
              Store for the best sneakers
            </p>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          <Link
            href="/cart"
            className="flex text-gray-500 items-center gap-2 cursor-pointer hover:text-black"
          >
            <ShoppingCart color="#6a7282" />
            <Total /> $
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
            className="flex text-gray-500 gap-2 cursor-pointer items-center hover:text-black"
          >
            <CircleUserRound color="#6a7282" />
            <p>Profile</p>
          </Link>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4">
            <Link
              href="/cart"
              className="flex text-gray-500 items-center gap-2 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart color="#6a7282" />
              <span>Cart</span>
            </Link>

            <Link
              href="/favorites"
              className="flex text-gray-500 items-center gap-2 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <Heart color="#6a7282" />
              <span>Favorite</span>
            </Link>

            <Link
              href="/404"
              className="flex text-gray-500 items-center gap-2 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <CircleUserRound color="#6a7282" />
              <span>Profile</span>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
