"use client";

import { CATEGORIES_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const HeaderMenu: React.FC<{ categories: CATEGORIES_QUERYResult }> = ({
  categories,
}) => {
  const pathname = usePathname() || ""; // Default to an empty string if null
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clean up timeout
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
      {/* Home Link */}
      <Link
        href="/"
        className={`hover:text-darkColor hoverEffect relative group ${
          pathname === "/" ? "text-darkColor" : ""
        }`}
      >
        Home
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
            pathname === "/" ? "w-1/2" : ""
          }`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
            pathname === "/" ? "w-1/2" : ""
          }`}
        />
      </Link>

      {/* Estimators Link */}
      <Link
        href="/estimators"
        className={`hover:text-darkColor hoverEffect relative group ${
          pathname === "/estimators" ? "text-darkColor" : ""
        }`}
      >
        Estimators
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
            pathname === "/estimators" ? "w-1/2" : ""
          }`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
            pathname === "/estimators" ? "w-1/2" : ""
          }`}
        />
      </Link>

      {/* Categories Dropdown */}
      <div
        className="relative"
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`flex items-center gap-2 hover:text-darkColor relative group ${
            pathname.includes("/category/") ? "text-darkColor" : ""
          }`}
        >
          Categories
          <svg
            className={`w-4 h-4 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Toggle dropdown"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg mt-2 rounded w-48 z-10">
            {categories?.map((category) => (
              <Link
                key={category?._id}
                href={`/category/${category?.slug?.current}`}
                className={`block px-4 py-2 text-sm capitalize hover:bg-gray-100 ${
                  pathname === `/category/${category?.slug?.current}`
                    ? "text-darkColor"
                    : ""
                }`}
              >
                {category?.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMenu;
