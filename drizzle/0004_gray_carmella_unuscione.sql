DROP INDEX "likes_profilesId_postId_idx";--> statement-breakpoint
ALTER TABLE "likes" ADD COLUMN "replyId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_replyId_post_id_fk" FOREIGN KEY ("replyId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "likes_profilesId_postId_idx" ON "likes" USING btree ("profilesId","postId","replyId");