"use client";

import { store } from "@/store";
import { trpc, trpcClient } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  // console.log("Providers mounting...");
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </Provider>
  );
}
