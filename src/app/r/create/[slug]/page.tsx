import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FC } from "react";

// nextjs will auto give you the [slug] param

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          auther: true,
          votes: true,
          comments: true,
        },
      },
    },
  });
  return <div>Page</div>;
};
export default Page;
