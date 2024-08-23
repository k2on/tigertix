"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            You must use your <b className="text-white">g.clemson.edu</b> email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="gap-2" onClick={() => signIn("google")}>
            <Image width={20} height={20} src={"/google.png"} alt="Google" />{" "}
            <span>Sign in with Google</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
