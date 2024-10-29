"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/utils/trpc";

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const userData = JSON.parse(userInfo);
        if (userData.interests && userData.interests.length === 0) {
          router.push("/interests");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error parsing userInfo:", error);
        router.push("/signin");
      }
    }
  }, [router]);

  const login = trpc.user.login.useMutation({
    onSuccess: (data) => {
      if (data && data?.userData?.userId) {
        localStorage.setItem("userInfo", JSON.stringify(data.userData));
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });

        if (data.userData.interests && data.userData.interests.length > 0) {
          router.push("/");
        } else {
          router.push("/interests");
        }
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    login.mutate(formData);
  };

  return (
    <div className="container max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8 border-2">
        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-600 mt-8 text-xl font-bold">
          Welcome back to ECOMMERCE
        </p>
        <p className="text-center text-gray-600 mb-6 mt-2 font-semibold text-base">
          The next gen business marketplace
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" variant="default" className="w-full uppercase">
            Login
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
          Don&apos;t have an Account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-bold"
          >
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
}
