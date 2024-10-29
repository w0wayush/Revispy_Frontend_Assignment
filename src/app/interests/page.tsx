"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/utils/trpc";

const interests = [
  { id: "books", label: "Books" },
  { id: "shoes", label: "Shoes" },
  { id: "bags", label: "Bags" },
  { id: "men-tshirts", label: "Men T-shirts" },
  { id: "women-tshirts", label: "Women T-shirts" },
  { id: "jewellery", label: "Jewellery" },
  { id: "toys", label: "Toys" },
  { id: "makeup", label: "Makeup" },
  { id: "furniture", label: "Furniture" },
  { id: "electronics", label: "Electronics" },
  { id: "home-decor", label: "Home Decor" },
  { id: "sports-equipment", label: "Sports Equipment" },
  { id: "musical-instruments", label: "Musical Instruments" },
  { id: "pet-supplies", label: "Pet Supplies" },
  { id: "health-care", label: "Health Care" },
  { id: "fitness-gear", label: "Fitness Gear" },
];

export default function InterestsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((i) => i !== interest)
        : [...current, interest]
    );
  };

  const updateInterests = trpc.user.updateInterests.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Your interests have been saved!",
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          interests: data.user.interests,
          userId: data.user._id,
          username: data.user.username,
        })
      );
      router.push("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one interest.",
      });
      return;
    }

    const userInfo = localStorage.getItem("userInfo");
    const userData = JSON.parse(userInfo || "");
    console.log(userData);

    updateInterests.mutate({
      userId: userData?.userId || "",
      interests: selectedInterests,
    });

    router.push("/interests");
  };

  return (
    <div className="container max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Please mark your interests!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We will keep you notified.
        </p>

        <div className="space-y-4 mb-8">
          {interests.map((interest) => (
            <div key={interest.id} className="flex items-center space-x-2">
              <Checkbox
                id={interest.id}
                checked={selectedInterests.includes(interest.id)}
                onCheckedChange={() => handleInterestChange(interest.id)}
              />
              <label
                htmlFor={interest.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {interest.label}
              </label>
            </div>
          ))}
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
}
