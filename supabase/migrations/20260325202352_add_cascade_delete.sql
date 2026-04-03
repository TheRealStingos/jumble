ALTER TABLE "public"."media_log" 
DROP CONSTRAINT "media_log_user_id_fkey";

ALTER TABLE "public"."media_log" 
ADD CONSTRAINT "media_log_user_id_fkey" 
FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") 
ON DELETE CASCADE;

ALTER TABLE "public"."profiles"
DROP CONSTRAINT "profiles_id_fkey";

ALTER TABLE "public"."profiles"
ADD CONSTRAINT "profiles_id_fkey"
FOREIGN KEY ("id") REFERENCES "auth"."users"("id")
ON DELETE CASCADE;

