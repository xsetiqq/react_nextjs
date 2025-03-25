"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold">Корзина</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-black text-lg"
        >
          ×
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-150px)]">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">Корзина пуста</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="border-b py-4 text-sm">
              ID: {item.id}, Кол-во: {item.quantity}
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <button className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded transition">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
