CREATE EXTENSION IF NOT EXISTS "citext";

ALTER TABLE "public"."profiles" ALTER COLUMN "username" TYPE citext;