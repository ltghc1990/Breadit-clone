import { getAuthSession } from "@/lib/auth";
import z from "zod";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";

// create a subreddit
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 });
    }

    const body = await req.json();

    const { name } = SubredditValidator.parse(body);
    // if the body does not match the schema name: string it will automatically throw an error

    const subredditExists = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (subredditExists) {
      return new Response("Subreddit already exists", { status: 409 });
    }

    const subreddit = await db.subreddit.create({
      data: { name, creatorId: session.user.id },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreddit.id,
      },
    });

    return new Response(subreddit.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("could not create subreddit", { status: 500 });
  }
}
