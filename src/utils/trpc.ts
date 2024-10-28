import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/routers/_app";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/trpc`,
    }),
  ],
});
