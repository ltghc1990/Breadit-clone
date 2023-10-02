"use client";

import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FC } from "react";

import React from "react";
import UserAvatar from "./UserAvatar";

type MiniCreatePostProps = {
  session: Session | null;
};

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  // const router = useRouter();
  // const pathname = usePathname();
  return (
    <li className="overflow-hidden bg-white rounded-md shadow">
      <div className="flex justify-between h-full gap-6 px-6 py-4">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />
          <span className="absolute right-0 w-3 h-3 rounded-full bottem-0 bg0green-500 outline outline-2 outline-white" />
        </div>
      </div>
    </li>
  );
};

export default MiniCreatePost;
