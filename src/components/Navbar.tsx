import Link from "next/link";
import React from "react";
import Icons from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import Searchbar from "./Searchbar";
const Navbar = async () => {
  const session = await getAuthSession();
  return (
    // interesting inset-x-0 allows the div to take up the entire space of the max-w-7xl even tho theres nothing inside the div
    <div className="fixed inset-x-0 top-0 z-50 py-2 border-b bg-zinc-100 h-fit border-zinc-300">
      <div className="container flex items-center justify-between h-full gap-2 max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="w-8 h-8 sm:h-6 sm:w-6" />
          <p className="hidden text-sm font-medium text-zinc-700 md:block">
            Breadit
          </p>
        </Link>

        <Searchbar />

        {/* the button variants gives us all the button classesnames without the other button props? */}

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
