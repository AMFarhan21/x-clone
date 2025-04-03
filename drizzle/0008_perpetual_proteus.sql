CREATE TABLE "rePost" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profilesId" uuid,
	"postId" uuid
);
--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "replyId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "rePost" ADD CONSTRAINT "rePost_profilesId_profiles_id_fk" FOREIGN KEY ("profilesId") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rePost" ADD CONSTRAINT "rePost_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_replyId_reply_id_fk" FOREIGN KEY ("replyId") REFERENCES "public"."reply"("id") ON DELETE cascade ON UPDATE no action;