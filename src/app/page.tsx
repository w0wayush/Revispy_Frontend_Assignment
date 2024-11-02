"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Interests from "@/components/Interest";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { ArrowRight } from "lucide-react";
import FeatureSection from "@/components/FeatureSection";
import Header from "@/components/Header";

export default function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      {/* Hero Section */}
      {!isAuthenticated ? (
        <div>
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                Welcome to <span className="text-primary">ECOMMERCE</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover a new way to shop with our next-generation marketplace.
                Join thousands of satisfied customers who trust us for their
                shopping needs.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  asChild
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <FeatureSection />

          {/* Call to Action Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute rotate-45 -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white rounded-full" />
              <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-white rounded-full" />
            </div>

            <div className="relative container mx-auto px-4 py-20">
              <div className="max-w-3xl mx-auto text-center">
                {/* Main Content */}
                <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                  Ready to Start Your Shopping Journey?
                </h2>

                <p className="text-lg text-blue-100 mb-10 leading-relaxed">
                  Join our community of smart shoppers and unlock a world of
                  exclusive deals, personalized recommendations, and premium
                  features designed just for you.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-black hover:bg-blue-50 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>

                  <Link
                    href="/learn-more"
                    className="inline-flex items-center px-8 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-600 transition-colors duration-200 border-2 border-white"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-blue-100">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    30-Day Free Trial
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    No Credit Card Required
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cancel Anytime
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-8 items-center flex-wrap">
                <div className="text-gray-500">🔒 Secure Payments</div>
                <div className="text-gray-500">⚡ Lightning Fast Delivery</div>
                <div className="text-gray-500">
                  💯 100% Satisfaction Guarantee
                </div>
                <div className="text-gray-500">🛡️ Buyer Protection</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Interests />
      )}
    </div>
  );
}
