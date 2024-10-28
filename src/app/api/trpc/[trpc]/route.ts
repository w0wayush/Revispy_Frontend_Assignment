import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/context";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
  try {
    const response = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: () => ({}),
      onError({ error, type, path, input }) {
        console.error("tRPC error:", { type, path, input, error });
      },
    });
    return response;
  } catch (error) {
    console.error("Error in tRPC handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
