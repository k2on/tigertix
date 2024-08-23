import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Header from "@/components/ui/header";
import { db } from "@/server/db";
import { games, posts } from "@/server/db/schema";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { eq } from "drizzle-orm";

export default async function Home() {
  const gamesList = await db.query.games.findMany({
    orderBy: games.startAt,
  });
  const session = await getServerAuthSession();
  const tickets = session
    ? await db.query.posts.findMany({
        where: eq(posts.createdById, session.user.id),
        with: {
          game: true,
        },
      })
    : [];

  return (
    <HydrateClient>
      <Header />
      <div className="px-2 pt-2">
        {tickets ? (
          <>
            <h2 className="font-semibold text-gray-400">Your Tickets</h2>
            <div className="flex flex-col gap-2">
              {tickets.map((ticket) => (
                <Link href={"/" + ticket.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {ticket.game.name} - {ticket.seatType}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : null}
        <h2 className="font-semibold text-gray-400">Upcoming Games</h2>
        <div className="flex flex-col gap-2">
          {gamesList ? (
            gamesList.map((game) => (
              <Link href={"/game/" + game.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{game.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))
          ) : (
            <span>No Upcoming Games</span>
          )}
        </div>
      </div>
    </HydrateClient>
  );
}
