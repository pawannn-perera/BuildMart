import Link from "next/link";
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

const EmptyFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <Heart className="w-16 h-16 text-red-200" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Your favorites list is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Save items you love to your favorites list and check back here to
          access them anytime.
        </p>
        <Button
          asChild
          className="w-full rounded-full font-semibold tracking-wide"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyFavorites;
