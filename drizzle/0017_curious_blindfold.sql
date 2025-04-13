ALTER TABLE "reply" ALTER COLUMN "text" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "verified" boolean DEFAULT false;