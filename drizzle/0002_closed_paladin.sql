ALTER TABLE "reply" ADD COLUMN "created_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "reply" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now();