import { db } from "@/lib/db";
import { bookmark } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { replyId, userId } = await req.json();

  const existing = await db.query.bookmark.findFirst({
    where: (bookmark, { and, eq }) =>
      and(eq(bookmark.replyId, replyId), eq(bookmark.profilesId, userId)),
  });

  if (existing) {
    const res = await db
      .delete(bookmark)
      .where(and(eq(bookmark.replyId, replyId), eq(bookmark.profilesId, userId)))
      .catch((error) => {
        console.log("ERROR DELETING BOOKMARKS: ", error);
        return NextResponse.json({
          success: false,
          message: "ERROR DELETING BOOKMARKS",
          error,
        });
      });
    console.log("Unbookmarked");
    return NextResponse.json({ success: true, message: "Unbookmarked", res });
  }

  const res = await db
    .insert(bookmark)
    .values({
      id: randomUUID(),
      replyId,
      profilesId: userId,
    })
    .catch((error) => {
      console.log("ERROR INSERTING BOOKMARKS: ", error);
      return NextResponse.json({
        success: false,
        message: "ERROR INSERTING BOOKMARKS",
        error,
      });
    });

  console.log("Bookmarked");
  return NextResponse.json({ success: true, message: "Bookmarked", res });
}
