ALTER TABLE "likes" DROP CONSTRAINT "likes_replyId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_replyId_reply_id_fk" FOREIGN KEY ("replyId") REFERENCES "public"."reply"("id") ON DELETE cascade ON UPDATE no action;