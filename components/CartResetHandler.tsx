"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import useCartStore from "@/store";

const CartResetHandler = () => {
  const { userId, isSignedIn } = useAuth();
  const setUserId = useCartStore((state) => state.setUserId);
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    if (isSignedIn && userId) {
      setUserId(userId);
    } else {
      setUserId(null);
      resetCart();
    }
  }, [isSignedIn, userId, setUserId, resetCart]);

  return null;
};

export default CartResetHandler;
