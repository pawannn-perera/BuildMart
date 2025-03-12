import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the FavoriteProduct interface
export interface FavoriteProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: { current: string };
  variant: string;
  status: string;
  intro: string;
}

// Define the FavoriteStore interface
interface FavoriteStore {
  favorites: FavoriteProduct[];
  addToFavorites: (product: FavoriteProduct) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  resetFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product) => {
        set((state) => {
          if (!state.favorites.some((fav) => fav._id === product._id)) {
            return { favorites: [...state.favorites, product] };
          }
          return state;
        });
      },
      removeFromFavorites: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => fav._id !== productId
          ),
        }));
      },
      isFavorite: (productId) => {
        return get().favorites.some((fav) => fav._id === productId);
      },
      resetFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorite-storage",
    }
  )
);
