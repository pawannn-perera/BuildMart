"use client";
import { CATEGORIES_QUERYResult, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Sorting state
  const [sortOption, setSortOption] = useState<
    "default" | "priceLowToHigh" | "priceHighToLow"
  >("default");

  const fetchProducts = async (categorySlug: string) => {
    try {
      setLoading(true);
      const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug]._id)] | order(name asc)`;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products with default order
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applySorting = () => {
    let sortedProducts = [...products];

    // Apply sorting based on the selected option
    switch (sortOption) {
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "priceHighToLow":
        sortedProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "default":
      default:
        sortedProducts = [...products]; // Default to the original fetched order
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  useEffect(() => {
    applySorting();
  }, [products, sortOption]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      {/* Categories Sidebar */}
      <div className="flex flex-col md:min-w-40 border ">
        {categories?.map((item) => (
          <Button
            key={item?._id}
            onClick={() => setCurrentSlug(item?.slug?.current as string)}
            className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${
              item?.slug?.current === currentSlug &&
              "bg-darkColor text-white border-darkColor"
            }`}
          >
            {item?.title}
          </Button>
        ))}
      </div>

      {/* Products and Sorting */}
      <div className="w-full">
        <div className="mb-5 flex justify-end">
          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(
                e.target.value as
                  | "default"
                  | "priceLowToHigh"
                  | "priceHighToLow"
              )
            }
            className="appearance-auto bg-white/30 backdrop-blur-lg text-gray-800 font-semibold px-4 py-2 rounded-xl hover:shadow-lg border border-black outline-black transition-all cursor-pointer"
          >
            <option
              className="bg-white text-gray-700 hover:bg-gray-200"
              value="default"
            >
              Default sorting
            </option>
            <option
              className="bg-white text-gray-700 hover:bg-gray-200"
              value="priceLowToHigh"
            >
              Sort by price: low to high
            </option>
            <option
              className="bg-white text-gray-700 hover:bg-gray-200"
              value="priceHighToLow"
            >
              Sort by price: high to low
            </option>
          </select>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="animate-spin" />
              <span className="text-lg font-semibold">
                Product is loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            {filteredProducts?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                {filteredProducts?.map((product) => (
                  <AnimatePresence key={product?._id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ) : (
              <NoProductsAvailable
                selectedTab={currentSlug}
                className="mt-0 w-full"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
