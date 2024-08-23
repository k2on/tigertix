"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { games } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SeatType = {
  UPPER: "upper",
  LOWER: "lower",
  HILL: "hill",
  STUDENT: "student",
} as const;

type SeatTypeValues = (typeof SeatType)[keyof typeof SeatType];

export default function SelectSeatType({
  game,
}: {
  game: InferSelectModel<typeof games>;
}) {
  const [seatType, setSeatType] = useState<SeatTypeValues>();
  const router = useRouter();

  function onNext() {
    if (!seatType) return;
    router.push("/sell/" + game.id + "/" + seatType);
  }

  const seatTypes = Object.values(SeatType);

  return (
    <div>
      <div className="px-2 pb-4 pt-2">
        <Card>
          <CardHeader>
            <CardTitle>Sell a ticket</CardTitle>
            <CardDescription>{game.name}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col space-y-4 px-2">
        {seatTypes.map((s) => (
          <Button
            onClick={() => setSeatType(s)}
            className={`justify-start py-8 transition-all ${seatType == s ? "border-2 border-white bg-zinc-800" : "border-2"}`}
            variant="outline"
          >
            <div className="flex flex-row items-center gap-4">
              {s.toLocaleUpperCase()}
            </div>
          </Button>
        ))}
      </div>

      <div className="fixed bottom-0 w-full p-2">
        <Button onClick={onNext} disabled={!seatType} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}
