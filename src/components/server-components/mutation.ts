"use server";

import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/serverSecret";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

const supabaseService = createServiceRoleClient();

export const handlePostSubmit = async (formData: FormData) => {
  const post = formData.get("post") as string;
  if (!post) return { success: false, message: "Type something" };

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) return { success: false, message: "User not authenticated" };

  const { error } = await supabaseService.from("post").insert({
    profilesid: userData.user.id,
    text: post.toString(),
    id: randomUUID(),
  });
  // console.log(error);
  // console.log(supabaseSecret);

  if (error) return { success: false, message: "Failed to insert post" };

  revalidatePath("/");
  return { success: true, message: "Post created successfully" };
};

export const likePost = async ({
  postId,
  profilesId,
}: {
  postId: string;
  profilesId: string;
}) => {
  const { data, error } = await supabaseService.from("likes").insert({
    postid: postId,
    profilesid: profilesId,
    id: randomUUID(),
  });

  console.log("ERRRROOORRRRR: ", error);
  void revalidatePath("/");
};

export const unlikPost = async ({
  postId,
  profilesId,
}: {
  postId: string;
  profilesId: string;
}) => {

  const { error: errorUnliking } = await supabaseService
    .from("likes")
    .delete()
    .eq("postid", postId)
    .eq("profilesid", profilesId);

  if (errorUnliking) {
    console.log(
      "ERROR on server-components/mutation -> const unlikePost: ",
      errorUnliking
    );
  }
  void revalidatePath("/");
};
