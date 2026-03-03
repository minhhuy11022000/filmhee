import { initTRPC, TRPCError } from "@trpc/server";

export type TRPCContext = {
  userId?: string;
};

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;

/** Open to everyone */
export const publicProcedure = t.procedure;

/** Requires a valid JWT — throws UNAUTHORIZED otherwise */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource.",
    });
  }
  return next({ ctx: { userId: ctx.userId } });
});
