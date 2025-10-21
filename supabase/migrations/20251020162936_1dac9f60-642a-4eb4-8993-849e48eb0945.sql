-- Create enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
      AND role = 'admin'
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  live_link TEXT,
  github_link TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON public.projects
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update projects"
  ON public.projects
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete projects"
  ON public.projects
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Create skills table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  percentage INTEGER NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Skills are viewable by everyone"
  ON public.skills
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert skills"
  ON public.skills
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update skills"
  ON public.skills
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete skills"
  ON public.skills
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Create about_section table (single row)
CREATE TABLE public.about_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio_text TEXT NOT NULL,
  profile_image TEXT,
  years_experience INTEGER NOT NULL DEFAULT 0,
  projects_completed INTEGER NOT NULL DEFAULT 0,
  happy_clients INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "About section is viewable by everyone"
  ON public.about_section
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can update about section"
  ON public.about_section
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert about section"
  ON public.about_section
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Create site_settings table (single row for global settings)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT NOT NULL DEFAULT 'Portfolio',
  hero_title TEXT NOT NULL DEFAULT 'Welcome',
  hero_subtitle TEXT,
  hero_background_image TEXT,
  logo_image TEXT,
  favicon TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true);

-- Storage policies for portfolio assets
CREATE POLICY "Portfolio assets are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admins can upload portfolio assets"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-assets' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update portfolio assets"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'portfolio-assets' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete portfolio assets"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'portfolio-assets' AND public.is_admin(auth.uid()));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_section_updated_at
  BEFORE UPDATE ON public.about_section
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();