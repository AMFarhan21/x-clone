"use server";

import { db } from "@/lib/db";
import { bookmark, likes, post, profiles, reply, rePost } from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { and, desc, eq, exists, like, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const postId = searchParams.get("postId");

  const userProfiles = await db.query.profiles.findFirst({
    where: (profiles, {eq}) => eq(profiles.id, userId)
  })

  const resOnePost = await db
    .select({
      post,
      id: post.id,
      profilesId: post.profilesId,
      text: post.text,
      imageUrl: post.imageUrl,
      created_at: post.created_at,
      updated_at: post.updated_at,
      username: profiles.username,
      displayName: profiles.displayName,
      profilePicture: profiles.profilePicture,
      likesCount: sql<number>`count(distinct ${likes.id})`.as("likesCount"),
      replyCount: sql<number>`count(distinct ${reply.id})`.as("replyCount"),
      rePostCount: sql<number>`count(distinct ${rePost.id})`.as("rePostCount"),
      isLiked: exists(
        db
          .select()
          .from(likes)
          .where(
            and(
              eq(likes.profilesId, userId),
              eq(likes.postId, post.id)
            )
          )
      ).as("isLiked"),
      isRePosted: exists(
        db
          .select()
          .from(rePost)
          .where(and(eq(rePost.postId, post.id), eq(rePost.profilesId, userId)))
      ).as("isRePosted"),
      isBookmarked: exists(
        db
        .select()
        .from(bookmark)
        .where(and(eq(bookmark.postId, post.id), eq(bookmark.profilesId, userId)))
      ).as("isBookmarked")
    })
    .from(post)
    .leftJoin(likes, eq(post.id, likes.postId))
    .leftJoin(reply, eq(post.id, reply.postId))
    .leftJoin(rePost, eq(post.id, rePost.postId))
    .where(eq(post.id, postId))
    .innerJoin(profiles, eq(profiles.id, post.profilesId))
    .groupBy(
      post.id,
      post.profilesId,
      post.text,
      post.imageUrl,
      post.created_at,
      post.updated_at,
      profiles.username,
      profiles.displayName,
      profiles.profilePicture
    );

  const res = await db
    .select({
      reply,
      id: reply.id,
      text: reply.text,
      profilesId: reply.profilesId,
      postId: reply.postId,
      replyId: reply.id,
      imageUrl: reply.imageUrl,
      created_at: reply.created_at,
      updated_at: reply.updated_at,
      username: profiles.username,
      displayName: profiles.displayName,
      profilePicture: profiles.profilePicture,
      replyLikesCount: sql<number>`count(distinct ${likes.replyId})`.as("replyLikesCount"),
      replyRepostCount: sql<number>`count(distinct ${rePost.replyId})`.as("replyRepostCount"),
      isReplyLiked: exists(
        db
          .select()
          .from(likes)
          .where(and(eq(likes.replyId, reply.id), eq(likes.profilesId, userId)))
      ).as("isReplyLiked"),
      isReplyReposted: exists(
        db
        .select()
        .from(rePost)
        .where(
          and(eq(rePost.replyId, reply.id), eq(rePost.profilesId, userId))
        )
      ).as("isReplyReposted"),
      isReplyBookmarked: exists(
        db
        .select()
        .from(bookmark)
        .where(and(eq(bookmark.replyId, reply.id), eq(bookmark.profilesId, userId)))
      ).as("isReplyBookmarked")
    })
    .from(reply)
    .where(eq(reply.postId, postId))
    .leftJoin(likes, eq(likes.replyId, reply.id))
    .leftJoin(rePost, eq(rePost.replyId, reply.id))
    .leftJoin(bookmark, eq(bookmark.replyId, reply.id))
    .innerJoin(profiles, eq(profiles.id, reply.profilesId))
    .groupBy(
      reply.id,
      reply.text,
      reply.profilesId,
      reply.postId,
      reply.created_at,
      reply.updated_at,
      reply.imageUrl,
      profiles.username,
      profiles.displayName,
      profiles.profilePicture
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
    resOnePost,
    userProfiles,
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

      return supabase.storage.from("x-clone-bucket").getPublicUrl(data?.path as string)
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
