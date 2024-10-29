"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  userAvatar: string;
  productName: string;
  department: string;
  productMaterial: string;
  category: string;
}

interface ToggleStates {
  [key: string]: boolean;
}

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 300;

const generateFakeData = (interest: string): ProductCardProps[] => {
  return Array.from({ length: 12 }, () => ({
    title: faker.commerce.productName(),
    userAvatar: faker.image.avatar(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    productName: faker.commerce.productName(),
    department: faker.commerce.department(),
    productMaterial: faker.commerce.productMaterial(),
    image: faker.image.url(),
    category: interest,
  }));
};

const ProductRating = () => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
    <span className="text-sm text-gray-600 ml-2">(24 reviews)</span>
  </div>
);

export default function Interests() {
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<ProductCardProps[]>([]);
  const [paginatedData, setPaginatedData] = useState<ProductCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [likedItems, setLikedItems] = useState<ToggleStates>({});
  const [cartItems, setCartItems] = useState<ToggleStates>({});
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const userData = JSON.parse(userInfo || "{}");
    setUserInterests(userData.interests || []);
  }, []);

  useEffect(() => {
    const interestData = userInterests.flatMap((interest) =>
      generateFakeData(interest)
    );
    setFilteredData(interestData);
    setPaginatedData(interestData.slice(0, 6));
  }, [userInterests, setPaginatedData, setFilteredData]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * 6;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPaginatedData(filteredData.slice(startIndex, startIndex + 6));
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 0);
    const startIndex = prevPage * 6;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPaginatedData(filteredData.slice(startIndex, startIndex + 6));
    setCurrentPage(prevPage);
  };

  const toggleLike = (itemId: string) => {
    setLikedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleCart = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end items-center mb-4">
          <Button variant="outline" onClick={() => router.push("/interests")}>
            Choose Interests
            <ArrowRight />
          </Button>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-center">Curated For You</h1>

        <div className="space-y-6">
          {paginatedData.map((item, index) => {
            const itemId = `${item.title}-${index}`;
            const isLiked = likedItems[itemId];
            const isInCart = cartItems[itemId];

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-black hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative w-full md:w-2/5 lg:w-1/3">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleLike(itemId)}
                        className={`absolute top-4 right-4 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                          isLiked
                            ? "bg-pink-500 hover:bg-pink-600 border-pink-500"
                            : "bg-white/80 hover:bg-white"
                        }`}
                      >
                        <Heart
                          className={`h-5 w-5 transition-colors duration-300 ${
                            isLiked
                              ? "text-white fill-current"
                              : "text-pink-500"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={item.userAvatar}
                        alt="Seller avatar"
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full ring-2 ring-purple-100"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {item.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-600">
                        {item.category}
                      </span>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600">
                        {item.productMaterial}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 flex-grow">
                      {item.description}
                    </p>

                    <div className="space-y-4">
                      <ProductRating />

                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">
                            ${parseFloat(item.price).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${(parseFloat(item.price) * 1.2).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => toggleCart(itemId)}
                            className={`rounded-full px-6 transition-all duration-300 flex items-center gap-2
                              ${
                                isInCart
                                  ? "bg-white border border-black hover:bg-gray-100 text-black"
                                  : "bg-black hover:bg-slate-800"
                              }`}
                          >
                            {isInCart ? (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Added to Cart
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="rounded-full px-6"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={(currentPage + 1) * 4 >= filteredData.length}
            className="rounded-full px-6 bg-black hover:bg-slate-600"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
