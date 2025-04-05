import { db } from "@/lib/db";
import { bookmark, likes, post, profiles, reply, rePost } from "@/lib/db/schema";
import { and, desc, eq, exists, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const userProfiles = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId),
  });

  const posts = await db
    .select({
      post,
      id: post.id,
      text: post.text,
      imageUrl: post.imageUrl,
      profilesId: post.profilesId,
      created_at: post.created_at,
      updated_at: post.updated_at,
      username: profiles.username,
      full_name: profiles.fullName,
      likesCount: sql<number>`count(${likes.id})`.as("likesCount"),
      replyCount: sql<number>`count(distinct ${reply.id})`.as("replyCount"),
      rePostCount: sql<number>`count(distinct ${rePost.id})`.as("rePostCount"),
      isLiked: exists(
        db
          .select()
          .from(likes)
          .where(and(eq(likes.postId, post.id), eq(likes.profilesId, userId)))
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
    .leftJoin(bookmark, eq(post.id, bookmark.postId))
    .innerJoin(profiles, eq(post.profilesId, profiles.id))
    .groupBy(
      post.id,
      post.imageUrl,
      profiles.username,
      profiles.fullName,
      post.created_at
    )
    .orderBy(desc(post.created_at))
    .catch((error) => {
      console.log("ERROR FETCHING THE POSTS: ", error);
      return NextResponse.json({ success: false, message: error });
    });

  const replies = await db
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
      full_name: profiles.fullName,
      replyLikesCount: sql<number>`count(${likes.replyId})`.as(
        "replyLikesCount"
      ),
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
      profiles.fullName
    )
    .orderBy(desc(reply.created_at))
    .catch((error) => {
      console.log("ERROR FETCHING THE REPLY: ", error);
      return NextResponse.json({ success: false, message: error });
    });

  return NextResponse.json({ userId, userProfiles, posts, replies });
}
