import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ListOrdered } from "lucide-react";
import { getAllCategories, getMyOrders } from "@/sanity/helpers/queries";
import FavoriteBadgeCount from "./FavoriteBadgeCount";
import CartResetHandler from "./CartResetHandler";
import FavoriteResetHandler from "./FavoriteResetHandler";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  const categories = await getAllCategories();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

  return (
    <>
      <CartResetHandler />
      <FavoriteResetHandler />
      <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
        <Container className="flex items-center justify-between gap-7 text-lightColor">
          <HeaderMenu categories={categories} />
          <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
            <MobileMenu />
            <Logo>BuildMart</Logo>
          </div>
          <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
            <SearchBar />
            <CartIcon />
            <FavoriteBadgeCount />

            <ClerkLoaded>
              <SignedIn>
                <Link href={"/orders"} className="group relative">
                  <ListOrdered className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
                  <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                    {orders?.length ? orders?.length : 0}
                  </span>
                </Link>
              </SignedIn>

              {user ? (
                <div className="flex items-center gap-4 text-sm border border-gray-300 px-4 py-2 rounded-lg shadow-lg bg-white hover:shadow-md transition duration-300 ease-in-out">
                  <UserButton />
                  <div className="hidden md:flex flex-col">
                    <p className="text-xs text-gray-500">Welcome</p>
                    <p className="font-semibold text-gray-800">
                      {user?.fullName}
                    </p>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="text-sm font-bold hover:text-darkColor hoverEffect px-4 py-2 border border-gray-300 rounded-md hover:border-darkColor">
                    Login
                  </button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
