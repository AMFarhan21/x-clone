"use server";

import { db } from "@/lib/db";
import { likes, post, profiles, reply } from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/serverSecret";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const supabaseService = createServiceRoleClient();

export const handlePostSubmit = async (formData: FormData) => {
  const postForm = formData.get("post") as string;

  if(postForm.length < 1) {
    return { success: false, message: "Type something" };
  } else if(postForm.length > 500) {
    return { success: false, message: "Your post is too long!" };
  }

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) return { success: false, message: "User not authenticated" };
  // const { error } = await supabaseService.from("post").insert({
  //   profilesid: userData.user.id,
  //   text: post.toString(),
  //   id: randomUUID(),
  // });
  const error = "";
  await db
    .insert(post)
    .values({
      profilesId: userData.user.id,
      text: postForm.toString(),
      id: randomUUID(),
    })
    .returning()
    .catch((error) => {
      if (error) return { success: false, message: "Failed to insert post" };
      console.log(
        "ERROR server-component/mutation - handlePostSubmit: ",
        error
      );
    });
  revalidatePath("/");
  return { success: true, message: "Post created successfully" };
};


export const handleReplySubmit = async(formData: FormData, postId: string, userId: string, postUsername: string) => {

  const replyForm = formData.get("reply") as string;
  if(replyForm.length < 1) {
    console.log("You can't post empty text")
    return {success: false, message: "You can't post empty text"};
  } else if (replyForm.length > 500) {
    console.log("Your replies is too long!", replyForm.length)
    return {success: false, message: "Your replies is too long!"}
  }
  console.log(replyForm)

  // const replyId = reply.id ?? null

  const res = await db.insert(reply).values({
    text: replyForm.toString(),
    profilesId: userId,
    postId,
  })
  revalidatePath(`/${postUsername}/status/${postId}`)
  return {success: true, message: "Replies created successfully"}



}


export const likePost = async ({
  postId,
  profilesId,
}: {
  postId: string;
  profilesId: string;
}) => {
  await db.insert(likes).values({
    postId,
    profilesId,
    id: randomUUID(),
  });

  // console.log("ERRRROOORRRRR: ", error);
  void revalidatePath("/");
};

export const unlikPost = async ({
  postId,
  profilesId,
}: {
  postId: string;
  profilesId: string;
}) => {
  await db
    .delete(likes)
    .where(and(eq(likes.postId, postId), eq(likes.profilesId, profilesId)))
    .catch((error) => console.log("ERROR UNLIKING THE POST"));

  void revalidatePath("/");
};
