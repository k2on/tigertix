import { getServerAuthSession } from "@/server/auth";
import Login from "./login";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  const session = await getServerAuthSession();
  if (session) return redirect(searchParams.callbackUrl || "/");
  return <Login />;
}
