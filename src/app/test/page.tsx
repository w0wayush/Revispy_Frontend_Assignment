"use client";

import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [mounted, setMounted] = useState(false);
  const [requestInfo, setRequestInfo] = useState<{
    url: string;
    timestamp: string;
  }>({ url: "", timestamp: "" });

  useEffect(() => {
    setMounted(true);
    setRequestInfo({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc/user.test`,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const { data, error, isLoading, isError, failureCount } =
    trpc.user.test.useQuery(undefined, {
      retry: false,
      enabled: mounted,
    });

  if (!mounted) return null;

  return (
    <div className="container max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          tRPC Connection Test
        </h1>

        <div className="space-y-4">
          {/* Connection Status */}
          <div className="p-4 rounded-lg border">
            <h2 className="font-semibold mb-2">Connection Status:</h2>
            {isLoading && (
              <div className="text-blue-500">
                <p>🔄 Testing connection...</p>
              </div>
            )}

            {isError && (
              <div className="text-red-500">
                <p>❌ Connection Error:</p>
                <p className="text-sm">{error?.message}</p>
                <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(error, null, 2)}
                </pre>
              </div>
            )}

            {data && (
              <div className="text-green-500">
                <p>✅ Connection Successful!</p>
                <div className="text-gray-700 mt-2">
                  <p>Message: {data.message}</p>
                  <p>Timestamp: {data.timestamp}</p>
                </div>
              </div>
            )}
          </div>

          {/* Request Information */}
          <div className="p-4 rounded-lg border">
            <h2 className="font-semibold mb-2">Request Information:</h2>
            <div className="text-sm space-y-1">
              <p>API URL: {requestInfo.url}</p>
              <p>Request Time: {requestInfo.timestamp}</p>
              <p>Environment: {process.env.NODE_ENV}</p>
            </div>
          </div>

          {/* Debug Information */}
          <div className="p-4 rounded-lg border">
            <h2 className="font-semibold mb-2">Debug Information:</h2>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(
                {
                  isLoading,
                  isError,
                  failureCount,
                  hasData: !!data,
                  error: error?.message,
                  env: {
                    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
                    NODE_ENV: process.env.NODE_ENV,
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
