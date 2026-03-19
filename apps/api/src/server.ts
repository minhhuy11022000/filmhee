import app from "./app";

const port = Number(process.env.PORT ?? 3001);

console.log(`🎬 Filmhee API running at http://localhost:${port}`);
console.log(`   tRPC endpoint: http://localhost:${port}/trpc`);
console.log(`   Health check:  http://localhost:${port}/health`);

export default {
  port,
  fetch: app.fetch,
};
