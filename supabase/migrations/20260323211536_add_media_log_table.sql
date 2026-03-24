CREATE TYPE media_type AS ENUM ('game', 'movie', 'music', 'book', 'tv');

CREATE TABLE media_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  media_id text NOT NULL,
  type media_type NOT NULL,
  title text NOT NULL,
  release_date timestamptz,
  cover text,
  user_rating numeric CHECK (user_rating BETWEEN 0.5 AND 5),
  user_review text,
  is_complete boolean DEFAULT false,
  logged_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE media_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users only"
ON public.media_log
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their media_log"
ON public.media_log
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can select their own media_log"
ON public.media_log
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their media_log"
ON public.media_log
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);