import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/ui/header";
import { db } from "@/server/db";
import { games, posts } from "@/server/db/schema";
import { RouterOutputs } from "@/trpc/react";
import { and, eq, InferSelectModel, isNull } from "drizzle-orm";
import Ticket from "./ticket";

interface Props {
  params: { game_id: string };
}

export default async function Page({ params }: Props) {
  const game = await db.query.games.findFirst({
    where: eq(games.id, params.game_id),
  });
  if (!game) return "Game not found";
  const tickets = await db.query.posts.findMany({
    where: and(eq(posts.gameId, params.game_id), isNull(posts.removedAt)),
    with: {
      poster: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-2 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>{game.name}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="px-2 pt-4">
        {tickets.length ? (
          tickets.map((t) => <Ticket key={t.id} ticket={t} user={t.poster} />)
        ) : (
          <span>There are no tickets for sale</span>
        )}
      </div>
    </>
  );
}
