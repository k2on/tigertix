import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { ticket_id: string };
};

async function getTicket(id: string) {
  return await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: {
      game: true,
      poster: true,
    },
  });
}

export async function generateMetedata({ params }: Props): Promise<Metadata> {
  const ticket = await getTicket(params.ticket_id);
  if (!ticket)
    return {
      title: "Ticket Not Found",
    };
  return {
    title: "Clemson v. NC State Lower Deck",
  };
}

export default async function Page({ params }: Props) {
  const ticket = await getTicket(params.ticket_id);

  if (!ticket) return <div>Ticket Not Found</div>;

  const user = await getServerAuthSession();

  const isUsersTicket = ticket.createdById == user?.user.id;

  return (
    <div>
      <Header />

      <div className="flex flex-col space-y-4 px-2 pt-4">
        <Card>
          <div className="flex flex-col">
            <div className="text-center">
              <Link href={`/game/${ticket.game.id}`}>
                <div>Clemson v. {ticket.game.name}</div>
              </Link>
              <div>{ticket.seatType}</div>
              <div>${ticket.price}</div>
              {!isUsersTicket && <div>By {ticket.poster.email}</div>}
            </div>
          </div>
        </Card>

        {isUsersTicket && (
          <Card>
            <CardHeader>
              <CardTitle>Your Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <span>You have no offers yet 🥲</span>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="fixed bottom-0 w-full p-2">
        {isUsersTicket ? (
          <div className="flex flex-row gap-2">
            <Button variant="destructive" className="w-full">
              Delete
            </Button>
            <Button className="w-full">Share</Button>
          </div>
        ) : (
          <>
            <Button className="w-full">Buy Now</Button>
          </>
        )}
      </div>
    </div>
  );
}
