"use client";

import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session }: any = useSession();

  return (
    <div className="">
      {session ? (
        <div>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
          <p>Current Logged in Account: {session?.user.email}</p>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              signIn("google");
            }}
          >
            Login
          </Button>
          <p>Please Log in</p>
        </div>
      )}
    </div>
  );
}
