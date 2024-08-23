"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server/db";
import { api, RouterOutputs } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CLEMSON_LOGO = "https://duckduckgo.com/assets/sports/ncaafb/Clemson.svg";

export default function Page() {
  const [gameId, setGameId] = useState<string>();
  const router = useRouter();

  const { data } = api.game.list.useQuery();

  function onNext() {
    if (!gameId) return;
    router.push("/sell/" + gameId);
  }

  return (
    <div>
      <div className="px-2 pb-4 pt-2">
        <Card>
          <CardHeader>
            <CardTitle>Sell a ticket</CardTitle>
            <CardDescription>Select the game</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col space-y-4 px-2">
        {data ? (
          data.map((game) => (
            <Game
              key={game.id}
              game={game}
              isSelected={gameId == game.id}
              onClick={() => setGameId(game.id)}
            />
          ))
        ) : (
          <>
            <div>Loading Games</div>
          </>
        )}
      </div>

      <div className="fixed bottom-0 w-full p-2">
        <Button onClick={onNext} disabled={!gameId} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}

function Game({
  game,
  isSelected,
  onClick,
}: {
  game: RouterOutputs["game"]["list"][number];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className={`justify-start py-8 transition-all ${isSelected ? "border-2 border-white bg-zinc-800" : "border-2"}`}
      variant="outline"
    >
      <div className="flex flex-row items-center gap-4">
        {game.name}
        <img className="h-8" src={game.image} />
      </div>
    </Button>
  );
}
