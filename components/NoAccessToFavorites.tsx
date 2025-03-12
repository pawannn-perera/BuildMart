import { SignInButton } from "@clerk/nextjs";
import { Heart, LogIn } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const NoAccessToFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <Heart className="w-16 h-16 text-red-200" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Sign in to view your favorites
        </h2>
        <p className="text-gray-600 mb-8">
          Please sign in to create and access your favorites list.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full rounded-full font-semibold tracking-wide flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5" />
            Sign In
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default NoAccessToFavorites;
