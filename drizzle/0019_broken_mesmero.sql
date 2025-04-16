ALTER TABLE "profiles" RENAME COLUMN "isVerified" TO "isPremium";--> statement-breakpoint
ALTER TABLE "profiles" RENAME COLUMN "verifiedSince" TO "premiumSince";--> statement-breakpoint
ALTER TABLE "profiles" RENAME COLUMN "verifiedExpiredAt" TO "premiumExpiredAt";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "isPremiumPlus" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "premiumPlusSince" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "premiumPlusExpiredAt" text;