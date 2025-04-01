import { db } from "@/lib/db";
import { likes, post, profiles, reply } from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/serverSecret";
import { count } from "console";
import { and, desc, eq, exists, sql } from "drizzle-orm";

// const queryWithUserId = `SELECT
//   post.*,
//   profiles.username,
//   profiles.full_name,
//   COUNT(likes.id) AS likes_count,
//   EXISTS(
//     SELECT 1 FROM likes
//     WHERE likes.postid = post.id
//     AND  likes.profilesid = $1
//   ) AS is_liked
//   FROM post
//   JOIN profiles ON post.profilesid = profiles.id
//   LEFT JOIN likes ON post.id = likes.postid
//   GROUP BY post.id, profiles.username, profiles.full_name
//   ORDER BY post.created_at DESC
// `;

// const queryWithoutUserId = `SELECT
//   post.*,
//   COUNT(likes.id) AS likes_count,
//   profiles.username,
//   profiles.full_name
//   FROM post
//   JOIN profiles ON post.profilesid = profiles.id
//   LEFT JOIN likes ON post.id = likes.postid
//   GROUP BY post.id, profiles.username, profiles.full_name
//   ORDER BY post.created_at DESC
// `;



export const getOnePost = async (userId: string, postId: string) => {
  const res = await db
    .select({
      post,
      id: post.id,
      profilesId: post.profilesId,
      text: post.text,
      imageUrl: post.imageUrl,
      created_at: post.created_at,
      updated_at: post.updated_at,
      username: profiles.username,
      full_name: profiles.fullName,
      likesCount: sql<number>`count(${likes.id})`.as("likesCount"),
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
    })
    .from(post)
    .leftJoin(likes, eq(post.id, likes.postId))
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
      profiles.fullName
    );
  return res[0];
};




export const getReplies = async (userId: string, postId: string) => {
  const res = await db
    .select({
      id: reply.id,
      text: reply.text,
      profilesId: reply.profilesId,
      postId: reply.postId,
      replyId: reply.id,
      created_at: reply.created_at,
      updated_at: reply.updated_at,
      username: profiles.username,
      full_name: profiles.fullName,
      likesReplyCount: sql<number>`count(${likes.id})`.as(
        "likesReplyCount"
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
    .leftJoin(likes, eq(reply.id, likes.replyId))
    .innerJoin(profiles, eq(profiles.id, reply.profilesId))
    .groupBy(
      reply.id,
      reply.text,
      reply.postId,
      reply.profilesId,
      reply.created_at,
      reply.updated_at,
      profiles.username,
      profiles.fullName,
    )
    ;

    console.log(res)
    return res
};
