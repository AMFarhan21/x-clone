"use server";

import { db } from "@/lib/db";
import { likes, post, profiles, reply } from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { and, desc, eq, exists, like, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const postId = searchParams.get("postId");

  const res = await db
    .select({
      reply,
      id: reply.id,
      text: reply.text,
      profilesId: reply.profilesId,
      postId: reply.postId,
      replyId: reply.id,
      created_at: reply.created_at,
      updated_at: reply.updated_at,
      username: profiles.username,
      full_name: profiles.fullName,
      replyLikesCount: sql<number>`count(${likes.replyId})`.as(
        "replyLikesCount"
      ),
      isReplyLiked: exists(
        db
          .select()
          .from(likes)
          .where(and(eq(likes.replyId, reply.id), eq(likes.profilesId, userId)))
      ).as("isReplyLiked"),
    })
    .from(reply)
    .where(eq(reply.postId, postId))
    .leftJoin(likes, eq(likes.replyId, reply.id))
    .innerJoin(profiles, eq(profiles.id, reply.profilesId))
    .groupBy(
      reply.id,
      reply.text,
      reply.profilesId,
      reply.postId,
      reply.created_at,
      reply.updated_at,
      profiles.username,
      profiles.fullName
    )
    .orderBy(desc(reply.created_at))
    .catch((error) => {
      console.log("ERROR FETCHING THE REPLY: ", error);
      return NextResponse.json({ success: false, message: error });
    });

  // revalidatePath("/");
  return NextResponse.json({
    success: true,
    message: "SUCCESSFULLY FETCH REPLY FOR THIS POST",
    res,
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const text = formData.get("text") as string;
  const files = formData.getAll("files") as File[];

  if (!text) {
    return NextResponse.json({ success: false, message: "Type something" });
  }

  const { searchParams } = new URL(req.url);
  const profilesId = searchParams.get("profilesId");
  const postId = searchParams.get("postId");

  // FILES
  const supabase = await createClient();
  const uploadFileUrl = await Promise.all(
    files.map(async (file) => {
      const fileName = `reply-files/${randomUUID()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("x-clone-bucket")
        .upload(fileName, file);
      if (error) {
        console.log("ERROR STORING FILE TO BUCKET: ", error);
      }

      return supabase.storage.from("x-clone-bucket").getPublicUrl(data?.path)
        .data.publicUrl;
    })
  );

  const res = await db
    .insert(reply)
    .values({
      text,
      profilesId,
      postId,
      imageUrl: uploadFileUrl.length > 0 ? JSON.stringify(uploadFileUrl) : null,
    })
    .catch((error) => {
      console.log("ERROR INSERTING REPLY: ", error);
      return NextResponse.json({
        success: false,
        message: `ERROR INSERTING REPLY: ${error}`,
      });
    });

  return NextResponse.json({ success: true, message: "Reply created", res });
}
