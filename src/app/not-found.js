"use client";

import React from "react";
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-100 rounded-full animate-pulse" />
            <AlertCircle className="relative w-20 h-20 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Oops! The page you&apos;re looking for seems to have wandered off.
          Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-gray-500">
          <p>
            Need assistance?{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rotate-12 bg-gradient-to-b from-blue-50 to-transparent opacity-30" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full -rotate-12 bg-gradient-to-t from-red-50 to-transparent opacity-30" />
      </div>
    </div>
  );
};

export default NotFound;
