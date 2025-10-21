import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    site_title: '',
    hero_title: '',
    hero_subtitle: '',
    hero_background_image: '',
    logo_image: '',
    favicon: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .maybeSingle();

    if (error) {
      toast({
        title: "Error fetching site settings",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setSettingsId(data.id);
      setFormData({
        site_title: data.site_title,
        hero_title: data.hero_title,
        hero_subtitle: data.hero_subtitle || '',
        hero_background_image: data.hero_background_image || '',
        logo_image: data.logo_image || '',
        favicon: data.favicon || '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const settingsData = {
      site_title: formData.site_title,
      hero_title: formData.hero_title,
      hero_subtitle: formData.hero_subtitle || null,
      hero_background_image: formData.hero_background_image || null,
      logo_image: formData.logo_image || null,
      favicon: formData.favicon || null,
    };

    if (settingsId) {
      const { error } = await supabase
        .from('site_settings')
        .update(settingsData)
        .eq('id', settingsId);

      if (error) {
        toast({
          title: "Error updating site settings",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Site settings updated successfully" });
      }
    } else {
      const { data, error } = await supabase
        .from('site_settings')
        .insert([settingsData])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error creating site settings",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setSettingsId(data.id);
        toast({ title: "Site settings created successfully" });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Site Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Global Site Configuration</CardTitle>
          <CardDescription>Update site-wide settings and branding</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_title">Site Title</Label>
              <Input
                id="site_title"
                value={formData.site_title}
                onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_title">Hero Title</Label>
              <Input
                id="hero_title"
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
              <Textarea
                id="hero_subtitle"
                value={formData.hero_subtitle}
                onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_background_image">Hero Background Image URL</Label>
              <Input
                id="hero_background_image"
                value={formData.hero_background_image}
                onChange={(e) => setFormData({ ...formData, hero_background_image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo_image">Logo Image URL</Label>
              <Input
                id="logo_image"
                value={formData.logo_image}
                onChange={(e) => setFormData({ ...formData, logo_image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="favicon">Favicon URL</Label>
              <Input
                id="favicon"
                value={formData.favicon}
                onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <Button type="submit" className="w-full">
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;