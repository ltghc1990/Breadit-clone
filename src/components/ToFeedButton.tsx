"use client";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/Button";
import { ChevronLeft } from "lucide-react";

const ToFeedButton = () => {
  const pathname = usePathname();

  // if path is /r/mycom, turn into /
  //  iif path is /r/mycom/post/oiefoieifofoiehfhse, turn into /r/mycom

  const subredditPath = getSubRedditPath(pathname);
  return (
    <a href={subredditPath} className={buttonVariants({ variant: "ghost" })}>
      <ChevronLeft className="w-4 h-4 mr-1" />
      {subredditPath === "/" ? "Back home" : "Back to community"}
    </a>
  );
};

export default ToFeedButton;

const getSubRedditPath = (pathname: string) => {
  const splitPath = pathname.split("/");

  if (pathname.length === 3) return "/";
  else if (splitPath.length > 3) return `${splitPath[1]}/${splitPath[2]}`;
  else return "/";
};
