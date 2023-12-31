import CommentsSection from "@/components/CommentsSection";
import EditorOutput from "@/components/EditorOutput";
import PostVoteServer from "@/components/post-vote/PostVoteServer";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { ArrowBigDown, Loader2 } from "lucide-react";
import { ArrowBigUp, Loader } from "lucide-react";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

const page = async ({ params }: PageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }
  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div className="flex flex-col items-center justify-between h-full sm:flex-row sm:items-start">
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error server component */}
          <PostVoteServer
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              });
            }}
          />
        </Suspense>

        <div className="flex-1 w-full p-4 bg-white rounded-sm sm:w-0">
          <p className="mt-1 text-xs text-gray-500 truncate max-h-40">
            Posted by u/{post?.author.username ?? cachedPost.authorUsername}{" "}
            {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
          </p>
          <h1 className="py-2 text-xl font-semibold leading-6 text-gray-900">
            {post?.title ?? cachedPost.title}
          </h1>

          <EditorOutput content={post?.content ?? cachedPost.content} />

          <Suspense
            fallback={
              <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
            }
          >
            {/* @ts-expect-error server component*/}
            <CommentsSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

// the fallback loading state of the post votes
function PostVoteShell() {
  return (
    <div className="flex flex-col items-center w-20 pr-6">
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigUp className="w-5 h-2 text-zinc-700" />
      </div>
      {/* score */}
      <div className="py-2 text-sm text-center front-medium text-zinc-900">
        <Loader className="w-3 h-3 animate-spin" />
      </div>
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigDown className="w-5 h-2 text-zinc-700" />
      </div>
    </div>
  );
}

export default page;
