


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."media_type" AS ENUM (
    'game',
    'movie',
    'music',
    'book',
    'tv'
);


ALTER TYPE "public"."media_type" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."media_log" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "media_id" "text" NOT NULL,
    "type" "public"."media_type" NOT NULL,
    "title" "text" NOT NULL,
    "cover" "text",
    "user_rating" numeric,
    "user_review" "text",
    "is_complete" boolean DEFAULT false,
    "release_date" timestamp with time zone,
    "logged_at" timestamp with time zone DEFAULT "now"(),
    "completed_at" timestamp with time zone,
    CONSTRAINT "media_log_user_rating_check" CHECK ((("user_rating" >= 0.5) AND ("user_rating" <= (5)::numeric)))
);


ALTER TABLE "public"."media_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."twitch_token" (
    "id" smallint DEFAULT '1'::smallint NOT NULL,
    "token" "text",
    "expires_at" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."twitch_token" OWNER TO "postgres";


COMMENT ON TABLE "public"."twitch_token" IS 'storage for twitch client token needed for IGDB requests';



ALTER TABLE ONLY "public"."media_log"
    ADD CONSTRAINT "media_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."twitch_token"
    ADD CONSTRAINT "twitch_token_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."media_log"
    ADD CONSTRAINT "media_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



CREATE POLICY "Enable insert for authenticated users only" ON "public"."media_log" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete from their media_log" ON "public"."media_log" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can select their own media_log" ON "public"."media_log" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their media_log" ON "public"."media_log" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."media_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."twitch_token" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."media_log" TO "anon";
GRANT ALL ON TABLE "public"."media_log" TO "authenticated";
GRANT ALL ON TABLE "public"."media_log" TO "service_role";



GRANT ALL ON TABLE "public"."twitch_token" TO "anon";
GRANT ALL ON TABLE "public"."twitch_token" TO "authenticated";
GRANT ALL ON TABLE "public"."twitch_token" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


