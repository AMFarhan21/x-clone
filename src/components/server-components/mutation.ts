"use server";

import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/serverSecret";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const handlePostSubmit = async (formData: FormData) => {
  const post = formData.get("post") as string;
  if (!post) return { success: false, message: "Type something" };

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) return { success: false, message: "User not authenticated" };

  const supabaseSecret = await createServiceRoleClient();
  const { error } = await supabaseSecret.from("post").insert({
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


export const likePost = async({postId, profilesId}:{postId:string, profilesId:string}) => {
  const supabaseService = await createServiceRoleClient();
  const { data, error } = await supabaseService.from("likes").insert({
    postid: postId,
    profilesid: profilesId,
    id: randomUUID()
  })

  console.log("ERRRROOORRRRR: ", error)
  revalidatePath("/")
}