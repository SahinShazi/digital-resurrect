
CREATE TABLE public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL DEFAULT '',
  period text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  achievements text[] NOT NULL DEFAULT '{}',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Admins can insert experiences" ON public.experiences FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update experiences" ON public.experiences FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete experiences" ON public.experiences FOR DELETE USING (is_admin(auth.uid()));

ALTER PUBLICATION supabase_realtime ADD TABLE public.experiences;
