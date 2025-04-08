CREATE TABLE "follows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profilesId" uuid,
	"following" uuid,
	"followers" uuid
);
--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_profilesId_profiles_id_fk" FOREIGN KEY ("profilesId") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_profiles_id_fk" FOREIGN KEY ("following") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followers_profiles_id_fk" FOREIGN KEY ("followers") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;