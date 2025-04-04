"use server";

import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profiles } from "./db/schema";
import { db } from "./db";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Check if username exists
  // const existing = await db
  //   .select()
  //   .from(profiles)
  //   .where(eq(profiles.username, username.trim()));

  // if (existing.length > 0) {
  //   console.log("Username already existed", existing);
  // }

  const { error: signUpError } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        username,
        password,
        email,
      },
    },
  });

  if (signUpError) {
    console.log("ERROR SIGNIN: ", signUpError);
    return { error: signUpError.message };
  }

  // const user = data.user;
  // if(!user) {
  //   console.log("USER IS NOT CREATED")
  //   return {error: "USER IS NOT CREATED"}
  // }

  // await db.insert(profiles).values({
  //   id: user.id,
  //   email: email,
  //   username: username,
  //   password: password,
  // })

  console.log("user is created");

  revalidatePath("/");
  redirect("/");

  // return { message: "user is created" };
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

  revalidatePath("/")
  redirect("/")
}
