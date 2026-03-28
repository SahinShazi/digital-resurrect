CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Social links viewable by everyone" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Admins can insert social links" ON public.social_links FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update social links" ON public.social_links FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete social links" ON public.social_links FOR DELETE USING (is_admin(auth.uid()));