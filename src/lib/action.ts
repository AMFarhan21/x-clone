"use server";

import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profiles } from "./db/schema";
import { db } from "./db";
import { NextResponse } from "next/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const { data: signedUp, error: signUpError } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        username,
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

  if(signedUp?.user?.id) {
    await db.update(profiles).set({
      username,
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

  revalidatePath("/", 'layout')
  redirect("/")
}
