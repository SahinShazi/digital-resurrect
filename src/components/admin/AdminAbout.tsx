import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminAbout = () => {
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    bio_text: '',
    profile_image: '',
    years_experience: 0,
    projects_completed: 0,
    happy_clients: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const { data, error } = await supabase
      .from('about_section')
      .select('*')
      .maybeSingle();

    if (error) {
      toast({
        title: "Error fetching about section",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setAboutId(data.id);
      setFormData({
        bio_text: data.bio_text,
        profile_image: data.profile_image || '',
        years_experience: data.years_experience,
        projects_completed: data.projects_completed,
        happy_clients: data.happy_clients,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const aboutData = {
      bio_text: formData.bio_text,
      profile_image: formData.profile_image || null,
      years_experience: formData.years_experience,
      projects_completed: formData.projects_completed,
      happy_clients: formData.happy_clients,
    };

    if (aboutId) {
      const { error } = await supabase
        .from('about_section')
        .update(aboutData)
        .eq('id', aboutId);

      if (error) {
        toast({
          title: "Error updating about section",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "About section updated successfully" });
      }
    } else {
      const { data, error } = await supabase
        .from('about_section')
        .insert([aboutData])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error creating about section",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setAboutId(data.id);
        toast({ title: "About section created successfully" });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Manage About Section</h2>

      <Card>
        <CardHeader>
          <CardTitle>About Section Content</CardTitle>
          <CardDescription>Update your bio and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio_text">Bio Text</Label>
              <Textarea
                id="bio_text"
                value={formData.bio_text}
                onChange={(e) => setFormData({ ...formData, bio_text: e.target.value })}
                rows={6}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile_image">Profile Image URL</Label>
              <Input
                id="profile_image"
                value={formData.profile_image}
                onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="years_experience">Years Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  value={formData.years_experience}
                  onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projects_completed">Projects Completed</Label>
                <Input
                  id="projects_completed"
                  type="number"
                  min="0"
                  value={formData.projects_completed}
                  onChange={(e) => setFormData({ ...formData, projects_completed: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="happy_clients">Happy Clients</Label>
                <Input
                  id="happy_clients"
                  type="number"
                  min="0"
                  value={formData.happy_clients}
                  onChange={(e) => setFormData({ ...formData, happy_clients: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAbout;