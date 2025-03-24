import { createServiceRoleClient } from "@/utils/supabase/serverSecret";

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




export const getPosts = async (user?: string) => {
  const query = user ? queryWithUserId : queryWithoutUserId;
  const values = user ? [user] : []

  const result = await pool.query(query, values);
  try {
    console.log(
      "SUCCESS server-components/fetch-data -> getPosts: ",
      result.rows
    );
    return result.rows;
  } catch (error) {
    console.log("ERROR server-components/fetch-data -> getPosts: ", error)
    return {error: "ERROR server-components/fetch-data -> getPosts"}
  }
};

export const getLikesCount = async (postId: string) => {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("postid", postId);

  if (error) {
    console.log("failed getting likes: ", error);
    return { error: error.message };
  }

  //   console.log(data);
  return data ? data.length : 0;
};

export const isLiked = async ({
  postId,
  profilesId,
}: {
  postId: string;
  profilesId: string;
}) => {
  const supabase = await createServiceRoleClient();

  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("postid", postId)
    .eq("profilesid", profilesId)
    .single();

  if (!profilesId) return;

  // if (error) {
  //   console.log("ERRORS on server-components/fetch-data -> isLiked(): ", error);
  //   return false;
  // }

  return data !== null;
};
