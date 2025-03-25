export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
