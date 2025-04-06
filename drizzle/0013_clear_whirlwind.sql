ALTER TABLE "profiles" ADD COLUMN "displayName" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "birthDate" date;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "password";