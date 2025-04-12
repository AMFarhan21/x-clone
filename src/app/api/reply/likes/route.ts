import { db } from "@/lib/db";
import { likes } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const replyId = searchParams.get("replyId") as string;
  const profilesId = searchParams.get("profilesId") as string;

  await db
    .insert(likes)
    .values({
      id: randomUUID(),
      profilesId,
      replyId,
    })
    .catch((error) => {
      console.log("ERROR LIKING REPLY", error);
      return NextResponse.json({
        success: false,
        message: "ERROR LIKING REPLY",
      });
    });

    return NextResponse.json({success: true, message: "You liked a reply"})
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const replyId = searchParams.get("replyId") as string;
  const profilesId = searchParams.get("profilesId") as string;

  await db
    .delete(likes)
    .where(and(eq(likes.replyId, replyId), eq(likes.profilesId, profilesId)))
    .catch((error) => {
      console.log("ERROR UNLIKING REPLY", error);
      return NextResponse.json({
        success: false,
        message: "ERROR UNLIKING REPLY",
      });
    })
    
    
    return NextResponse.json({success: true, message: "You unliked a reply"})
}
