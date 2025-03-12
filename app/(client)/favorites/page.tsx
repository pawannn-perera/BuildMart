"use client";
import { useAuth } from "@clerk/nextjs";
import NoAccessToFavorites from "@/components/NoAccessToFavorites";
import Container from "@/components/Container";
import EmptyFavorites from "@/components/EmptyFavorites";
import { useFavoriteStore } from "@/favoriteStore";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";

const FavoritesPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { favorites, removeFromFavorites } = useFavoriteStore();

  const handleRemoveFavorite = (productId: string) => {
    removeFromFavorites(productId);
    toast.success("Removed from favorites!");
  };

  if (!isLoaded) return <p>Loading...</p>; // Prevents hydration issues
  if (!isSignedIn) return <NoAccessToFavorites />;

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Container>
        {favorites.length > 0 ? (
          <>
            <div className="flex items-center gap-2 py-5">
              <Heart className="text-red-600" />
              <h1 className="text-2xl font-semibold">My Favorites</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative">
                    <Link href={`/product/${product.slug.current}`}>
                      <div className="h-64 overflow-hidden">
                        <Image
                          src={product.images[0] || "/placeholder.jpg"}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <button
                      onClick={() => handleRemoveFavorite(product._id)}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50"
                    >
                      <Heart
                        className="w-5 h-5 text-red-600"
                        fill="currentColor"
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-2 line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.intro}
                    </p>
                    <PriceFormatter
                      amount={product.price}
                      className="font-bold text-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyFavorites />
        )}
      </Container>
    </div>
  );
};

export default FavoritesPage;
