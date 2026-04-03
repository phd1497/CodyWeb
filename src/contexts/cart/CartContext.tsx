import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  addItem: (productId: string) => void;
}

const CartContext = createContext<CartState>({
  items: [],
  itemCount: 0,
  addItem: () => undefined,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem,
    }),
    [items, addItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
