"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/utils/trpc";

interface UserData {
  interests: string[];
  userId: string;
  name: string;
}

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = trpc.user.signup.useMutation({
    onSuccess: (data) => {
      // Store user ID and email in localStorage
      if (data && data?.userData?.userId) {
        localStorage.setItem("userInfo", JSON.stringify(data.userData));
      }
      localStorage.setItem("verificationEmail", formData.email);

      toast({
        title: "Account created",
        description: "Please check your email for the verification code.",
      });
      router.push("/verify");
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    const data = signup.mutate(formData);
    console.log("Sign up data:", data);
  };

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");

    if (userInfoString) {
      const userData = JSON.parse(userInfoString) as UserData;
      if (userData.interests && userData.interests.length > 0) {
        router.push("/");
      } else {
        router.push("/interests");
      }
    }
  }, []);

  return (
    <div className="container max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8 border-2">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value.trim() })
              }
              placeholder="Enter your name"
              disabled={isSubmitting}
              required
              minLength={2}
              maxLength={50}
            />
          </div>

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
                setFormData({ ...formData, email: e.target.value.trim() })
              }
              placeholder="Enter your email"
              disabled={isSubmitting}
              required
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
              disabled={isSubmitting}
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full uppercase"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Have an Account?{" "}
          <Link
            href="/signin"
            className="text-primary hover:underline font-bold"
          >
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
