import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import { useFavoriteStore, FavoriteProduct } from "@/favoriteStore"; // Import the favorite store and FavoriteProduct interface
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoriteStore(); // Use the favorite store

  // Function to convert Product to FavoriteProduct with default values
  const convertToFavoriteProduct = (product: Product): FavoriteProduct => {
    // Extract image URLs from the images array
    const imageUrls =
      (product.images
        ?.map((image) => {
          if (image.asset?._ref) {
            return urlFor(image.asset._ref).url();
          }
          return undefined;
        })
        .filter((url) => url !== undefined) as string[]) || [];

    return {
      _id: product._id,
      name: product.name || "Unknown Product",
      price: product.price || 0,
      images: imageUrls,
      slug: { current: product.slug?.current || "unknown" },
      variant: product.variant || "Unknown Variant",
      status: product.status || "Unknown Status",
      intro: product.intro || "No introduction",
    };
  };

  const handleToggleFavorite = () => {
    const favoriteProduct = convertToFavoriteProduct(product);

    if (isFavorite(product._id)) {
      removeFromFavorites(product._id);
      toast.success("Removed from favorites!");
    } else {
      addToFavorites(favoriteProduct);
      toast.success("Added to favorites!");
    }
  };

  return (
    <div className="group text-sm rounded-lg overflow-hidden">
      <div className=" bg-white border border-b-0 rounded-lg overflow-hidden relative">
        {product?.images && product?.images[0]?.asset?._ref && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]?.asset?._ref).url()}
              width={500}
              height={500}
              alt="productImage"
              priority
              className={`w-full h-72 object-contain overflow-hidden hoverEffect ${product?.stock !== 0 && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center">
            <p className="text-xl text-white font-semibold text-center">
              Out of Stock
            </p>
          </div>
        )}
        {product?.status && (
          <div className="absolute left-1 top-1 z-10 flex flex-col items-center space-y-1 text-gray-500 px-2 py-1 group-hover:opacity-0 transition-opacity duration-300">
            {product.status.split("").map((char, index) => (
              <span key={index} className="font-semibold uppercase">
                {char}
              </span>
            ))}
          </div>
        )}
        <div className="absolute top-2 right-2 z-20">
          <Heart
            onClick={handleToggleFavorite}
            className={`w-6 h-6 hover:text-green-600 hoverEffect cursor-pointer ${
              isFavorite(product._id) ? "text-green-600" : ""
            }`}
          />
        </div>
      </div>
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        <h2 className="font-semibold line-clamp-1">{product?.name}</h2>
        <p>{product?.brand}</p>
        <PriceView
          className="text-lg"
          price={product?.price}
          discount={product?.discount}
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
