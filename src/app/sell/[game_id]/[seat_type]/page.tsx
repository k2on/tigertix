import Price from "./price";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { games } from "@/server/db/schema";

type Props = {
  params: { game_id: string; seat_type: string };
};

export default async function Page({ params }: Props) {
  const game = await db.query.games.findFirst({
    where: eq(games.id, params.game_id),
  });
  if (!game) return "Game not found";
  return <Price game={game} seatType={params.seat_type} />;
}
