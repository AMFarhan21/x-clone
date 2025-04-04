ALTER TABLE "profiles" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "profilePicture" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "backgroundPicture" text;