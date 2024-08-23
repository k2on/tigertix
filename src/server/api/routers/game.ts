import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gameRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return db.query.games.findMany();
  }),
});
