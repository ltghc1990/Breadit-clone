import { buttonVariants } from "@/components/ui/Button";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FC } from "react";
import { ChevronLeft } from "lucide-react";
import SignUp from "@/components/SignUp";

const page: FC = () => {
  return (
    <div className="absolute inset-0 border border-red-400">
      <div className="flex flex-col items-center justify-center h-full max-w-2xl gap-20 mx-auto">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            " self-start -mt-20"
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-2 " />
          Home
        </Link>
        <SignUp />
      </div>
    </div>
  );
};

export default page;
