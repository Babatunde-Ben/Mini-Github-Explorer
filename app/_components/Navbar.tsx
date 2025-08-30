"use client";
import React from "react";
import GithubIcon from "@/app/_assets/svg/github.svg";
import Button from "@/app/_components/Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LogOutIcon from "@/app/_assets/svg/log-out.svg";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="mb-14 flex items-center justify-between">
      <GithubIcon className="size-8 inline-block" />
      {session && (
        <>
          <div className="flex items-center gap-2">
            <Image
              src={session?.user?.image || ""}
              alt="User"
              width={40}
              height={40}
              className="rounded-full shrink-0 hidden sm:inline-block"
            />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Authenticated as
              </p>
              <p className="text-sm font-medium">{session?.user?.name}</p>
            </div>
          </div>

          <div className="h-10 w-28">
            <Button onClick={() => signOut()} variant="secondary">
              <LogOutIcon className="size-4 inline-block" />
              Logout
            </Button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
