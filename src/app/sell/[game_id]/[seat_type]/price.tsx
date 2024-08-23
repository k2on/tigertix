"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { games } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Price({
  game,
  seatType,
}: {
  game: InferSelectModel<typeof games>;
  seatType: string;
}) {
  const [price, setPrice] = useState<number>();
  const router = useRouter();
  const { mutate, isPending } = api.post.create.useMutation({
    onSuccess(data) {
      router.push("/" + data.id);
    },
  });

  function onPost() {
    if (!price) return;
    mutate({
      game_id: game.id,
      seat_type: seatType,
      price,
    });
  }

  function parsePrice(s: string) {
    try {
      const r = parseFloat(s);
      if (Number.isNaN(r)) return undefined;
      return r;
    } catch {
      return undefined;
    }
  }

  const isValidPrice = price != undefined && price >= 0;

  return (
    <div>
      <div className="px-2 pb-4 pt-2">
        <Card>
          <CardHeader>
            <CardTitle>Sell a ticket</CardTitle>
            <CardDescription>
              {game.name} · {seatType}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex w-full flex-col justify-center px-2">
        <div className="flex flex-row items-center text-6xl">
          <span>$</span>
          <input
            min="0"
            type="number"
            onChange={(e) => setPrice(parsePrice(e.target.value))}
            className="w-full bg-transparent"
            autoFocus
            placeholder="0.00"
          />
        </div>
        <div className="text-gray-400">Ticket price</div>
      </div>

      <div className="fixed bottom-0 w-full p-2">
        <Button
          onClick={onPost}
          disabled={!isValidPrice || isPending}
          className="w-full"
        >
          {isPending ? <>Posting</> : "Post Ticket"}
        </Button>
      </div>
    </div>
  );
}
