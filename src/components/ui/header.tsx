import Link from "next/link";
import { Button } from "./button";

export default async function Header() {
  return (
    <div className="flex flex-row items-center justify-between border-b px-2 py-2">
      <span className="font-semibold">Dabbo&apos;s Den</span>

      <div>
        <Link href="/sell">
          <Button>Sell a Ticket</Button>
        </Link>
      </div>
    </div>
  );
}
