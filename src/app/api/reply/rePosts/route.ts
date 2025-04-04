import { db } from "@/lib/db";
import { rePost } from "@/lib/db/schema";
import { error } from "console";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, replyId } = await req.json();

  const existing = await db.query.rePost.findFirst({
    where: (rePost, { and, eq }) =>
      and(eq(rePost.profilesId, userId), eq(rePost.replyId, replyId)),
  });

  if (existing) {
    const res = await db
      .delete(rePost)
      .where(and(eq(rePost.profilesId, userId), eq(rePost.replyId, replyId)))
      .catch((error) => {
        console.log("ERROR DELETING ReplyRepost", error);
        return NextResponse.json({
          success: true,
          message: "ERROR DELETING ReplyRepost",
          error,
        });
      });

    console.log("SUCCESS DELETING ReplyRepost");
    return NextResponse.json({ success: true, message: "Unreposted", res });
  }

  const res = await db
    .insert(rePost)
    .values({
      id: randomUUID(),
      profilesId: userId,
      replyId,
    })
    .catch((error) => {
      console.log("ERROR INSERTING ReplyRepost", error);
      return NextResponse.json({
        success: true,
        message: "ERROR INSERTING ReplyRepost",
        error,
      });
    })
    
    console.log("SUCCESS INSERTING ReplyRepost");
    return NextResponse.json({ success: true, message: "Reposted", res });
}
