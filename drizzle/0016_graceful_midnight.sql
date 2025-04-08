ALTER TABLE "follows" DROP CONSTRAINT "follows_followers_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "follows" DROP COLUMN "followers";