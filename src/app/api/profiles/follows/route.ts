import { db } from "@/lib/db";
import { follows } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// export async function GET(req: Request) {

//   const {searchParams} = new URL(req.url)
//   const username = await searchParams.get("username")

//   const getOneProfiles = await db.query.profiles.findFirst({
//     where: (profiles, { eq }) => eq(profiles.username, username),
//   });

//   const userId = getOneProfiles?.id;

//   const getFollowers = await db.query.follows.findMany({
//     where: (follows, { eq }) => eq(follows.following, userId),
//     with: {
//       followers: true,
//     },
//   });
// }

export async function POST(req: Request) {
  const { targetUserId, userId } = await req.json();

  const existingRow = await db.query.follows.findFirst({
    where: (follows, { and, eq }) =>
      and(eq(follows.profilesId, userId), eq(follows.following, targetUserId)),
  });

  if (existingRow) {
    const res = await db
      .delete(follows)
      .where(
        and(eq(follows.following, targetUserId), eq(follows.profilesId, userId))
      )
      .catch((error) => {
        console.log("ERROR UNFOLLOW", error);
        return NextResponse.json({
          success: false,
          message: "ERROR UNFOLLOW",
          error,
        });
      });
    console.log("SUCCESS UNFOLLOWING");
    return NextResponse.json({ success: true, message: "unfollowed", res });
  }

  const res = await db
    .insert(follows)
    .values({
      id: randomUUID(),
      following: targetUserId,
      profilesId: userId,
    })
    .catch((error) => {
      console.log("ERROR INSERTING FOLLOWS TABLE: ", error);
      return NextResponse.json({
        success: false,
        message: "ERROR INSERTING FOLLOWS TABLE",
        error,
      });
    });

  console.log("SUCCESS INSERTING FOLLOWS TABLE");
  return NextResponse.json({ success: true, message: "followed", res });
}
