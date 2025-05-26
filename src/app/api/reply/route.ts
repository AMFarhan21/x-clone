import { db } from "@/lib/db";
import { reply } from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const text = formData.get("text") as string;
  const files = formData.getAll("files") as File[];

  if (!text && !files) {
    return NextResponse.json({ success: false, message: "Type something" });
  }

  const { searchParams } = new URL(req.url);
  const profilesId = searchParams.get("profilesId") as string;
  const dataId = searchParams.get("dataId") as string;

  const idFromPost = await db.query.post.findFirst({
    where: (post, { eq }) => eq(post.id, dataId),
  });

  const idFromReply = await db.query.reply.findFirst({
    where: (reply, { eq }) => eq(reply.id, dataId),
  });

  // FILES
  const supabase = await createClient();
  const uploadFileUrl = await Promise.all(
    files.map(async (file) => {
      const fileName = `reply-files/${randomUUID()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("x-clone-bucket")
        .upload(fileName, file);
      if (error) {
        console.log("ERROR STORING FILE TO BUCKET: ", error);
      }

      return supabase.storage
        .from("x-clone-bucket")
        .getPublicUrl(data?.path as string).data.publicUrl;
    })
  );

  if (idFromPost) {
    const res = await db
      .insert(reply)
      .values({
        text,
        profilesId,
        postId: dataId,
        imageUrl:
          uploadFileUrl.length > 0 ? JSON.stringify(uploadFileUrl) : null,
      })
      .catch((error) => {
        console.log("ERROR INSERTING REPLY: ", error);
        return NextResponse.json({
          success: false,
          message: `ERROR INSERTING REPLY: ${error}`,
        });
      });
    return NextResponse.json({
      success: true,
      message: "Reply of post is created",
      res,
    });
  } else if (idFromReply) {
    const res = await db
      .insert(reply)
      .values({
        text,
        profilesId,
        replyId: dataId,
        imageUrl:
          uploadFileUrl.length > 0 ? JSON.stringify(uploadFileUrl) : null,
      })
      .catch((error) => {
        console.log("ERROR INSERTING REPLY: ", error);
        return NextResponse.json({
          success: false,
          message: `ERROR INSERTING REPLY: ${error}`,
        });
      });
    return NextResponse.json({
      success: true,
      message: "Reply of reply is created",
      res,
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Invalid dataId: not found in post or reply",
    });
  }
}
