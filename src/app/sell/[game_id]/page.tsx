import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import SelectSeatType from "./seat_type";

type Props = {
  params: { game_id: string };
};

export default async function Page({ params }: Props) {
  const game = await db.query.games.findFirst({
    where: eq(games.id, params.game_id),
  });
  if (!game) return <div>Game not found</div>;
  return <SelectSeatType game={game} />;
}
