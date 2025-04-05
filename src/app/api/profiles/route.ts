import { db } from "@/lib/db"
import { likes, post, profiles, reply } from "@/lib/db/schema"
import { and, desc, eq, exists, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId")

    const userProfiles = await db.query.profiles.findFirst({
      where: (profiles, {eq}) => 
        eq(profiles.id, userId)
    })

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
            isLiked: exists(
              db
                .select()
                .from(likes)
                .where(and(eq(likes.postId, post.id), eq(likes.profilesId, userId)))
            ).as("isLiked"),
          })
          .from(post)
          .leftJoin(likes, eq(post.id, likes.postId))
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
            console.log("ERROR FETCHING THE POSTS: ", error)
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
          isReplyLiked: exists(
            db
              .select()
              .from(likes)
              .where(and(eq(likes.replyId, reply.id), eq(likes.profilesId, userId)))
          ).as("isReplyLiked"),
        })
        .from(reply)
        .leftJoin(likes, eq(likes.replyId, reply.id))
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
    

    return NextResponse.json({userId, userProfiles, posts, replies})
}