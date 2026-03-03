import { router } from "../trpc";
import { filmsRouter } from "./films";
import { authRouter } from "./auth";
import { usersRouter } from "./users";

export const appRouter = router({
  films: filmsRouter,
  auth: authRouter,
  users: usersRouter,
});

/** Export the AppRouter type — imported by apps/web for end-to-end type safety */
export type AppRouter = typeof appRouter;
