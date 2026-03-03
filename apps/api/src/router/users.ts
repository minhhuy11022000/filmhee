import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { db } from "../lib/db";

export const usersRouter = router({
  /** Get the current user's profile */
  profile: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: { id: ctx.userId },
      select: { id: true, name: true, email: true, avatarUrl: true, subscription: true, createdAt: true },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
    }

    return user;
  }),

  /** List films in the current user's watchlist */
  watchlist: protectedProcedure
    .input(z.object({ page: z.number().int().positive().default(1) }).optional())
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = 20;

      return db.watchlistItem.findMany({
        where: { userId: ctx.userId },
        include: { film: { include: { cast: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      });
    }),

  /** Add a film to the current user's watchlist */
  addToWatchlist: protectedProcedure
    .input(z.object({ filmId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return db.watchlistItem.upsert({
        where: { userId_filmId: { userId: ctx.userId, filmId: input.filmId } },
        create: { userId: ctx.userId, filmId: input.filmId },
        update: {},
        include: { film: true },
      });
    }),

  /** Remove a film from the current user's watchlist */
  removeFromWatchlist: protectedProcedure
    .input(z.object({ filmId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.watchlistItem.delete({
        where: { userId_filmId: { userId: ctx.userId, filmId: input.filmId } },
      });
      return { success: true };
    }),

  /** Get the current user's watch history */
  history: protectedProcedure
    .input(z.object({ page: z.number().int().positive().default(1) }).optional())
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = 20;

      return db.watchHistory.findMany({
        where: { userId: ctx.userId },
        include: { film: { include: { cast: true } } },
        orderBy: { watchedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      });
    }),

  /** Update (or create) the watch progress for a film */
  updateProgress: protectedProcedure
    .input(
      z.object({
        filmId: z.string(),
        progress: z.number().int().min(0).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return db.watchHistory.upsert({
        where: { userId_filmId: { userId: ctx.userId, filmId: input.filmId } },
        create: { userId: ctx.userId, filmId: input.filmId, progress: input.progress },
        update: { progress: input.progress, watchedAt: new Date() },
      });
    }),
});
