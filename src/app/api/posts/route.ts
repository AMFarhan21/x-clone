import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return NextResponse.json("Please login first", userError);
  }
  // console.log("USER :", userData);

  const formData = await req.formData();
  const text = formData.get("text") as string;
  const files = formData.getAll("files") as File[];

  if (!text && !files) {
    return NextResponse.json({ success: false, message: "Type or input something" });
  }

  const uploadFileUrl = await Promise.all(
    files.map(async (file) => {
      const fileName = `post-files/${randomUUID()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("x-clone-bucket")
        .upload(fileName, file);
      if (error) {
        console.log("ERROR on uploadFileUrl: ", error);
      }
      return supabase.storage.from("x-clone-bucket").getPublicUrl(data?.path as string)
        .data.publicUrl;
    })
  );

  try {
    const res = await db
      .insert(post)
      .values({
        text: text,
        profilesId: userData.user.id,
        imageUrl:
          uploadFileUrl.length > 0 ? JSON.stringify(uploadFileUrl) : null,
      })
      .returning();

    return NextResponse.json({ success: true, res });
  } catch (error) {
    console.log("ERROR INSERTING POST: ", error);
    return NextResponse.json({ success: false, error });
  }
}
