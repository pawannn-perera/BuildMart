"use client";
import { useFavoriteStore } from "@/favoriteStore";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavoriteBadgeCount = () => {
  const { favorites } = useFavoriteStore();

  return (
    <Link href="/favorites" className="group relative">
      <Heart className="w-5 h-5 group-hover:text-red-600 hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-red-600 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {favorites.length ? favorites.length : 0}
      </span>
    </Link>
  );
};

export default FavoriteBadgeCount;
