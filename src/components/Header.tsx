"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopHeader from "./TopHeader";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = ["/signin", "/signup", "/verify", "/interests"].includes(
    pathname
  );

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

              <div className="flex items-center space-x-4">
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

        {!isAuthPage && (
          <div className="py-2 bg-gray-50 text-center text-sm font-medium">
            <button className="mx-4">&lt;</button>
            Get 10% off on business sign up
            <button className="mx-4">&gt;</button>
          </div>
        )}
      </div>
    </header>
  );
}
