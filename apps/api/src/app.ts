import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./router";
import { verifyJWT } from "./lib/auth";

const app = new Hono();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use("*", logger());

app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// ── tRPC ─────────────────────────────────────────────────────────────────────
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, c) => {
      const authHeader = c.req.header("Authorization");
      const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
      const userId = token ? verifyJWT(token) : undefined;
      return { userId };
    },
  })
);

export default app;
