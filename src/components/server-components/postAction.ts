import { db } from "@/lib/db";
import { bookmark, likes, post, profiles, reply, rePost } from "@/lib/db/schema";
import { and, desc, eq, exists, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function getPostsAction(userId: string) {

  const userProfiles = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId as string)
  })

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
          .where(and(eq(likes.postId, post.id), eq(likes.profilesId, userId as string)))
      ).as("isLiked"),
      isRePosted: exists(
        db
          .select()
          .from(rePost)
          .where(and(eq(rePost.postId, post.id), eq(rePost.profilesId, userId as string)))
      ).as("isRePosted"),
      isBookmarked: exists(
        db
          .select()
          .from(bookmark)
          .where(and(eq(bookmark.postId, post.id), eq(bookmark.profilesId, userId as string)))
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
    .orderBy(desc(post.created_at))
    .catch((error) => {
      console.log("GET post api ERROR: ", error);
      return NextResponse.json({ success: false, message: "GET post api ERROR", error });
    })


  return NextResponse.json({ success: true, result, userId, userProfiles });
}
