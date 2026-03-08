import { useState, useCallback, createContext, useContext } from "react";

const STORAGE_KEY = "bc-scarfs-cart";

const getStored = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
};

const save = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getStored);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === item.productId && i.color === item.color);
      let next;
      if (idx >= 0) {
        next = prev.map((i, j) => (j === idx ? { ...i, quantity: i.quantity + 1 } : i));
      } else {
        next = [...prev, { ...item, quantity: 1 }];
      }
      save(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((productId, color) => {
    setItems((prev) => {
      const next = prev.filter((i) => !(i.productId === productId && i.color === color));
      save(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId, color, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const next = prev.map((i) =>
        i.productId === productId && i.color === color ? { ...i, quantity } : i
      );
      save(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    save([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalPriceFormatted = `₺${totalPrice.toLocaleString("tr-TR")}`;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, totalPriceFormatted }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
