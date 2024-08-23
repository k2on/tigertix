import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Header from "@/components/ui/header";
import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const game = await db.query.games.findFirst({
    orderBy: games.startAt,
  });

  return (
    <HydrateClient>
      <Header />
      <div className="px-2 pt-2">
        {game ? (
          <Link href={"/game/" + game.id}>
            <Card>
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ) : (
          <span>No Upcoming Games</span>
        )}
      </div>
    </HydrateClient>
  );
}
