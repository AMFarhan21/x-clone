ALTER TABLE "profiles" RENAME COLUMN "verified" TO "isVerified";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "verifiedSince" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "verfiedExpiredAt" text;