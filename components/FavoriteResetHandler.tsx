"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useFavoriteStore } from "../favoriteStore";

const FavoriteResetHandler = () => {
  const { userId } = useAuth();
  const resetFavorites = useFavoriteStore((state) => state.resetFavorites);

  useEffect(() => {
    if (!userId) {
      resetFavorites();
    }
  }, [userId, resetFavorites]);

  return null;
};

export default FavoriteResetHandler;
