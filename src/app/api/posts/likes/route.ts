"use server";

import { db } from "@/lib/db";
import { likes, post, profiles } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);

  const postId = searchParams.get("postId")! || null;
  const profilesId = searchParams.get("userId")!;

  const res = await db
    .insert(likes)
    .values({
      postId,
      profilesId,
      id: randomUUID(),
    })
    .returning()
    .catch((error) => {
      console.log("ERROR LIKING THE POST: ", error);
      return NextResponse.json({
        success: false,
        message: "ERROR LIKING THE MESSAGE",
        error,
      });
    });

  revalidatePath("/");
  return NextResponse.json({
    success: true,
    message: "SUCCESSFULLY LIKING THE PAGE",
    res,
  });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  const profilesId = searchParams.get("userId");

  const res = await db
    .delete(likes)
    .where(
      and(
        eq(likes.postId, postId as string),
        eq(likes.profilesId, profilesId as string)
      )
    )
    .returning()
    .catch((error) => {
      console.log("ERROR UNLIKING THE POST: ", error);
      return NextResponse.json({
        success: false,
        message: "ERROR UNLIKING THE POST",
        error,
      });
    });

  void revalidatePath("/");

  return NextResponse.json({
    success: true,
    message: "SUCCESSFULLY UNLIKING A POST",
    res,
  });
}
