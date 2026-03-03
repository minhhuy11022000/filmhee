import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { db } from "../lib/db";

export const filmsRouter = router({
  /** List films with optional genre filter, search, and pagination */
  list: publicProcedure
    .input(
      z
        .object({
          genre: z.string().optional(),
          search: z.string().optional(),
          page: z.number().int().positive().default(1),
          limit: z.number().int().positive().max(50).default(20),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 20;

      const films = await db.film.findMany({
        where: {
          ...(input?.genre ? { genres: { has: input.genre } } : {}),
          ...(input?.search
            ? {
                OR: [
                  { title: { contains: input.search, mode: "insensitive" } },
                  { description: { contains: input.search, mode: "insensitive" } },
                  { director: { contains: input.search, mode: "insensitive" } },
                ],
              }
            : {}),
        },
        include: { cast: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await db.film.count({
        where: {
          ...(input?.genre ? { genres: { has: input.genre } } : {}),
        },
      });

      return { films, total, page, limit };
    }),

  /** Get a single film by ID */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const film = await db.film.findUnique({
        where: { id: input.id },
        include: { cast: true },
      });

      if (!film) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Film not found." });
      }

      return film;
    }),

  /** Latest films ordered by creation date */
  trending: publicProcedure
    .input(z.object({ limit: z.number().int().positive().max(20).default(10) }).optional())
    .query(async ({ input }) => {
      return db.film.findMany({
        include: { cast: true },
        orderBy: { createdAt: "desc" },
        take: input?.limit ?? 10,
      });
    }),

  /** Highest-rated films */
  topRated: publicProcedure
    .input(z.object({ limit: z.number().int().positive().max(20).default(10) }).optional())
    .query(async ({ input }) => {
      return db.film.findMany({
        include: { cast: true },
        orderBy: { rating: "desc" },
        take: input?.limit ?? 10,
      });
    }),

  /** The featured film for the hero banner */
  featured: publicProcedure.query(async () => {
    const film = await db.film.findFirst({
      where: { featured: true },
      include: { cast: true },
    });

    if (!film) {
      return db.film.findFirst({ include: { cast: true }, orderBy: { rating: "desc" } });
    }

    return film;
  }),
});
