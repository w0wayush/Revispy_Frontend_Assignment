"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu } from "lucide-react"; // Import the Menu icon for hamburger
import { Button } from "@/components/ui/button";
import TopHeader from "./TopHeader";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle dropdown menu
  const pathname = usePathname();
  const isAuthPage = ["/signin", "/signup", "/verify"].includes(pathname);
  // const { isAuthenticated } = useAuthStore();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <TopHeader />
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            ECOMMERCE
          </Link>

          {!isAuthPage && (
            <>
              {/* Hamburger Icon for Mobile */}
              <button
                className="md:hidden text-gray-700"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Desktop Navbar */}
              <nav className="hidden md:flex items-center space-x-8 font-semibold">
                <Link href="/categories" className="text-sm hover:text-primary">
                  Categories
                </Link>
                <Link href="/sale" className="text-sm hover:text-primary">
                  Sale
                </Link>
                <Link href="/clearance" className="text-sm hover:text-primary">
                  Clearance
                </Link>
                <Link href="/new-stock" className="text-sm hover:text-primary">
                  New stock
                </Link>
                <Link href="/trending" className="text-sm hover:text-primary">
                  Trending
                </Link>
              </nav>

              {/* Mobile Dropdown Menu */}
              {menuOpen && (
                <div className="md:hidden absolute top-24 right-10 w-48 bg-white border-t shadow-md rounded-md">
                  <nav className="flex flex-col items-center space-y-2 py-4 font-semibold">
                    <Link
                      href="/categories"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-blue-100 w-full py-2 px-4 rounded-md"
                      onClick={toggleMenu}
                    >
                      <i className="icon-class-for-categories text-gray-600"></i>{" "}
                      {/* Icon placeholder */}
                      Categories
                    </Link>
                    <Link
                      href="/sale"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-green-100 w-full py-2 px-4 rounded-md"
                      onClick={toggleMenu}
                    >
                      <i className="icon-class-for-sale text-gray-600"></i>{" "}
                      {/* Icon placeholder */}
                      Sale
                    </Link>
                    <Link
                      href="/clearance"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-red-100 w-full py-2 px-4 rounded-md"
                      onClick={toggleMenu}
                    >
                      <i className="icon-class-for-clearance text-gray-600"></i>{" "}
                      {/* Icon placeholder */}
                      Clearance
                    </Link>
                    <Link
                      href="/new-stock"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-yellow-100 w-full py-2 px-4 rounded-md"
                      onClick={toggleMenu}
                    >
                      <i className="icon-class-for-new-stock text-gray-600"></i>{" "}
                      {/* Icon placeholder */}
                      New stock
                    </Link>
                    <Link
                      href="/trending"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-purple-100 w-full py-2 px-4 rounded-md"
                      onClick={toggleMenu}
                    >
                      <i className="icon-class-for-trending text-gray-600"></i>{" "}
                      {/* Icon placeholder */}
                      Trending
                    </Link>
                  </nav>
                </div>
              )}

              {/* Action Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {!isAuthPage && (
        <div className="py-2 bg-gray-50 text-center text-sm font-medium w-full">
          <button className="mx-4">&lt;</button>
          Get 10% off on business sign up
          <button className="mx-4">&gt;</button>
        </div>
      )}
    </header>
  );
}
