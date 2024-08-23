"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { posts, users } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import TimeAgo from "react-timeago";

export default function Ticket({
  ticket,
  user,
}: {
  ticket: InferSelectModel<typeof posts>;
  user: InferSelectModel<typeof users>;
}) {
  return (
    <Link href={"/" + ticket.id}>
      <Card>
        <CardHeader>
          <CardTitle>
            {ticket.seatType} · ${ticket.price}
          </CardTitle>
          <CardDescription>
            Posted <TimeAgo date={ticket.createdAt} /> by {user.name}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
