"use server";

import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profiles } from "./db/schema";
import { db } from "./db";
import { UserLogin } from "@/types";

const uniqueUsername = async(base: string) => {
  const usernameBase = base.trim().toLowerCase().replace(/\s+/g, "_").slice(0, 24);
  let suffix = 0
  let uniqueUsername = usernameBase

  while(true) {
    const res = await db.select().from(profiles).where(eq(profiles.username, uniqueUsername))
    if(!res || res.length === 0) break
    suffix++
    const suffixStr = suffix.toString()
    const trimBase = usernameBase.slice(0, 24 - suffixStr.length)
    uniqueUsername = `${trimBase}${suffix}`
  }

  return uniqueUsername
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const usernameBase = await uniqueUsername(username)
  const displayNameBase = username

  const { data: signedUp, error: signUpError } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        username: usernameBase,
        email,
      },
    },
  });

  if (signUpError) {
    console.log("ERROR SIGNIN: ", signUpError);
    return { success: false, message: "ERROR SIGNIN", error: signUpError.message };
  }

  revalidatePath("/");

  console.log("CHECK YOUR EMAIL");
  console.log(signedUp)

  if (signedUp?.user?.id) {
    await db.update(profiles).set({
      username: usernameBase,
      displayName: displayNameBase,
      email
    }).where(eq(profiles.id, signedUp?.user.id))
  }

  return { success: true, message: "Check your email to validate", signedUp };

  redirect("/");
}

export async function signin(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("ERROR LOGIN", error);
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("ERROR TO LOG/SIGN OUT", error);
  }

  // revalidatePath("/", 'layout')
  // redirect("/")
}

export async function updateGoogleSignUp(user: UserLogin) {

  if (user?.app_metadata?.provider === "google") {
    const existing = await db.select().from(profiles).where(eq(profiles.id, user.id))

    if(existing.length > 0 && existing[0].username) return 

    const username = await uniqueUsername(user.user_metadata.name)
    const displayName = user.user_metadata.name.slice(0, 24)

    await db.update(profiles).set({
      username: username,
      displayName: displayName,
      email: user.user_metadata.email,
      profilePicture: user.user_metadata.picture,
    }).where(eq(profiles.id, user.id))
  }
}
