import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { router, publicProcedure } from "../trpc";
import { db } from "../lib/db";
import { signJWT } from "../lib/auth";

const safeUser = (user: { id: string; name: string; email: string; avatarUrl: string | null; subscription: string }) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
  subscription: user.subscription,
});

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const existing = await db.user.findUnique({ where: { email: input.email } });
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists." });
      }

      const hashed = await bcrypt.hash(input.password, 12);
      const user = await db.user.create({
        data: { name: input.name, email: input.email, password: hashed },
      });

      const token = signJWT(user.id);
      return { token, user: safeUser(user) };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { email: input.email } });
      if (!user) {
        // Same error for both "not found" and "wrong password" — prevents user enumeration
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const token = signJWT(user.id);
      return { token, user: safeUser(user) };
    }),
});
