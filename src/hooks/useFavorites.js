import { useState, useCallback } from "react";

const STORAGE_KEY = "bc-scarfs-favorites";

const getStoredFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(getStoredFavorites);

  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (productId) => favorites.includes(productId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};
