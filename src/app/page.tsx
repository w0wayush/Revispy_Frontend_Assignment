"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Interests from "@/components/Interest";

export default function Home() {
  const [userInfo, setUserInfo] = useState<string | null>(null);

  useEffect(() => {
    // Ensure this code runs only in the browser
    const storedUserInfo = localStorage.getItem("userInfo");
    setUserInfo(storedUserInfo);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {!userInfo ? (
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to ECOMMERCE</h1>
          <p className="text-xl">The next gen business marketplace</p>
          <div className="flex justify-center gap-4">
            <Button variant="default" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Interests />
      )}
    </div>
  );
}
