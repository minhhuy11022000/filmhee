/**
 * tRPC client for Filmhee.
 *
 * Usage in a Server Component (one-off call):
 *   import { trpc } from '@/lib/trpc'
 *   const films = await trpc.films.trending.query()
 *
 * The AppRouter type is imported from @filmhee/api — this gives you
 * full end-to-end type safety between the frontend and backend with
 * zero manual type maintenance.
 */
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@filmhee/api";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser — use relative URL (same domain) or NEXT_PUBLIC_API_URL
    return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  }
  // Server-side rendering — use the full URL
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
}

function getAuthToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("filmhee_token") ?? undefined;
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
      headers() {
        const token = getAuthToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});
