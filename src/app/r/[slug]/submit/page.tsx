import Editor from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!subreddit) {
    return notFound();
  }
  return (
    <div className="flex flex-col items-start gap-6">
      <div className="pb-5 border-b border-gray-200">
        <div className="flex flex-wrap items-baseline -mt-2 -ml-2">
          <h3 className="mt-2 text-base font-semibold leading-6 text-gray-900 ml">
            Create Post
          </h3>
          <p className="mt-1 ml-2 text-sm text-gray-500 truncate">
            in r/{params.slug}
          </p>
        </div>
      </div>

      {/* {form} */}
      <Editor subredditId={subreddit.id} />
      <div className="flex justify-end w-full">
        {/* form prop functions like an id, allows us to trigger the form even tho the button is outside the form*/}
        {/* the form exist inside the editor */}
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
