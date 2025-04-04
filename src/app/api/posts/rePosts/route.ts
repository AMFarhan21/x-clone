import { db } from "@/lib/db";
import { rePost } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, userId } = await req.json();

  const existing = await db.query.rePost.findFirst({
    where: (rePost, { and, eq }) =>
      and(eq(rePost.profilesId, userId), eq(rePost.postId, postId)),
  });

  if (existing) {
    const res = await db
      .delete(rePost)
      .where(and(eq(rePost.profilesId, userId), eq(rePost.postId, postId)))
      .catch((error) => {
        console.log("ERROR DELETING REPOST", error);
        return NextResponse.json({
          success: false,
          error,
          message: "ERROR DELETING REPOST",
        });
      });

      return NextResponse.json({
        success: true,
        res,
        message: "Unreposted",
      })
  }

  const res = await db
    .insert(rePost)
    .values({
      id: randomUUID(),
      profilesId: userId,
      postId: postId,
    })
    .catch((error) => {
      console.log("ERROR INSERTING REPOST", error);
      return NextResponse.json({
        success: false,
        message: "ERROR INSERTING REPOST",
        error
      });
    });


  return NextResponse.json({
    success: true,
    message: "Reposted",
    res,
  });
}
