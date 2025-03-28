import { db } from "@/lib/db";
import { likes, post, profiles } from "@/lib/db/schema";
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

export const getPosts = async (user: string) => {

  // const supabaseUser = await createClient();
  // const {data: userData, error: userError} = await supabaseUser.auth.getUser();
  // console.log(userData.user?.id)
  // const user = userData.user?.id

  const result = await db
    .select({post, 
      id: post.id,
      text: post.text,
      profilesId: post.profilesId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      username: profiles.username,
      full_name: profiles.fullName,
      likesCount: sql<number>`count(likes.id)`.as("likesCount"),
      isLiked: exists(
        db.select().from(likes).where(and(eq(likes.postId, post.id), eq(likes.profilesId, user ?? "default-user-id")))
      ).as("isLiked")
    })
    .from(post)
    .leftJoin(likes, eq(post.id, likes.postId))
    .innerJoin(profiles, eq(post.profilesId, profiles.id))
    .groupBy(post.id, profiles.username, profiles.fullName, post.createdAt, post.text, post.profilesId, post.updatedAt)
    .orderBy(desc(post.createdAt))

  try {
    // console.log("SUCCESS server-components/fetch-data -> getPosts: ", result);
    return {result, user};
  } catch (error) {
    console.log("ERROR server-components/fetch-data -> getPosts: ", error);
    return { error: "ERROR server-components/fetch-data -> getPosts" };
  }
};





// export const getLikesCount = async (postId: string) => {
//   const supabase = await createServiceRoleClient();
//   const { data, error } = await supabase
//     .from("likes")
//     .select("*")
//     .eq("postid", postId);

//   if (error) {
//     console.log("failed getting likes: ", error);
//     return { error: error.message };
//   }

//   //   console.log(data);
//   return data ? data.length : 0;
// };





// export const isLiked = async ({
//   postId,
//   profilesId,
// }: {
//   postId: string;
//   profilesId: string;
// }) => {
//   const supabase = await createServiceRoleClient();

//   const { data, error } = await supabase
//     .from("likes")
//     .select("*")
//     .eq("postid", postId)
//     .eq("profilesid", profilesId)
//     .single();

//   if (!profilesId) return;

//   // if (error) {
//   //   console.log("ERRORS on server-components/fetch-data -> isLiked(): ", error);
//   //   return false;
//   // }

//   return data !== null;
// };
