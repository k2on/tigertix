import Link from "next/link";
import { Button } from "./button";
import { getServerAuthSession } from "@/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-row items-center justify-between border-b px-2 py-2">
      <Link href="/">
        <span className="font-semibold">Dabbo&apos;s Den</span>
      </Link>

      <div>
        {!session ? (
          <Link href="/sell">
            <Button>Sell a Ticket</Button>
          </Link>
        ) : (
          <Link href="/sell">
            <Button>Sell a Ticket</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
