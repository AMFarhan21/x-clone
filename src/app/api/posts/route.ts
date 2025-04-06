"use server";

import { db } from "@/lib/db";
import { bookmark, likes, post, profiles, reply, rePost } from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { and, desc, eq, exists, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user") || null;

    const result = await db
      .select({
        post,
        id: post.id,
        text: post.text,
        imageUrl: post.imageUrl,
        profilesId: post.profilesId,
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
            .where(and(eq(likes.postId, post.id), eq(likes.profilesId, user)))
        ).as("isLiked"),
        isRePosted: exists(
          db
            .select()
            .from(rePost)
            .where(and(eq(rePost.postId, post.id), eq(rePost.profilesId, user)))
        ).as("isRePosted"),
        isBookmarked: exists(
          db
          .select()
          .from(bookmark)
          .where(and(eq(bookmark.postId, post.id), eq(bookmark.profilesId, user)))
        ).as("isBookmarked")
      })
      .from(post)
      .leftJoin(likes, eq(post.id, likes.postId))
      .leftJoin(reply, eq(post.id, reply.postId))
      .leftJoin(rePost, eq(post.id, rePost.postId))
      .leftJoin(bookmark, eq(post.id, bookmark.postId))
      .innerJoin(profiles, eq(post.profilesId, profiles.id))
      .groupBy(
        post.id,
        post.imageUrl,
        profiles.username,
        profiles.displayName,
        post.created_at,
        profiles.profilePicture
      )
      .orderBy(desc(post.created_at));

    return NextResponse.json({ success: true, result, user });
  } catch (error) {
    console.log("ERROR server-components/fetch-data -> getPosts: ", error);
    return NextResponse.json({
      success: false,
      message: "ERROR server-components/fetch-data -> getPosts",
      error,
    });
  }
}

export async function POST(req: Request) {
  // const {searchParams} = new URL(req.url)
  // const path = searchParams.get("path")

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return NextResponse.json("Please login first", userError);
  }
  console.log("USER :", userData);

  const formData = await req.formData();
  const text = formData.get("text") as string;
  const files = formData.getAll("files") as File[];

  if (!text) {
    return NextResponse.json({ success: false, message: "Type something" });
  }

  const uploadFileUrl = await Promise.all(
    files.map(async (file) => {
      const fileName = `post-files/${randomUUID()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("x-clone-bucket")
        .upload(fileName, file);
      if (error) {
        console.log("ERROR on uploadFileUrl: ", error);
      }
      return supabase.storage.from("x-clone-bucket").getPublicUrl(data.path)
        .data.publicUrl;
    })
  );

  try {
    const res = await db
      .insert(post)
      .values({
        text: text,
        profilesId: userData.user.id,
        imageUrl:
          uploadFileUrl.length > 0 ? JSON.stringify(uploadFileUrl) : null,
      })
      .returning();

    // console.log("revalidating the path")
    // res.revalidate("/")
    // console.log("revalidating triggered")
    return NextResponse.json({ success: true, res });
  } catch (error) {
    console.log("ERROR INSERTING POST: ", error);
    return NextResponse.json({ success: false, error });
  }
}
