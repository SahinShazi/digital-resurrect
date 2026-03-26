import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    id: "",
    site_title: "",
    hero_title: "",
    hero_subtitle: "",
    hero_background_image: "",
    logo_image: "",
    favicon: "",
  });
  const [about, setAbout] = useState({
    id: "",
    bio_text: "",
    years_experience: 0,
    projects_completed: 0,
    happy_clients: 0,
    profile_image: "",
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [settingsRes, aboutRes] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).single(),
      supabase.from("about_section").select("*").limit(1).single(),
    ]);
    if (settingsRes.data) setSettings({
      ...settingsRes.data,
      hero_subtitle: settingsRes.data.hero_subtitle || "",
      hero_background_image: settingsRes.data.hero_background_image || "",
      logo_image: settingsRes.data.logo_image || "",
      favicon: settingsRes.data.favicon || "",
    });
    if (aboutRes.data) setAbout({
      ...aboutRes.data,
      profile_image: aboutRes.data.profile_image || "",
    });
    setLoading(false);
  };

  const saveSettings = async () => {
    const { error } = await supabase.from("site_settings").update({
      site_title: settings.site_title,
      hero_title: settings.hero_title,
      hero_subtitle: settings.hero_subtitle || null,
      hero_background_image: settings.hero_background_image || null,
      logo_image: settings.logo_image || null,
      favicon: settings.favicon || null,
    }).eq("id", settings.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Site settings saved!" });
  };

  const saveAbout = async () => {
    const { error } = await supabase.from("about_section").update({
      bio_text: about.bio_text,
      years_experience: about.years_experience,
      projects_completed: about.projects_completed,
      happy_clients: about.happy_clients,
      profile_image: about.profile_image || null,
    }).eq("id", about.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "About section saved!" });
  };

  if (loading) return <div className="text-center text-muted-foreground py-8">Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Site Settings */}
      <div className="glass rounded-2xl p-6 border border-border space-y-4">
        <h3 className="text-lg font-bold text-foreground">Site Settings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Site Title</label>
            <Input value={settings.site_title} onChange={(e) => setSettings({ ...settings, site_title: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Hero Title</label>
            <Input value={settings.hero_title} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Hero Subtitle</label>
          <Input value={settings.hero_subtitle} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} className="bg-secondary/50 border-border" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Logo Image URL</label>
            <Input value={settings.logo_image} onChange={(e) => setSettings({ ...settings, logo_image: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Favicon URL</label>
            <Input value={settings.favicon} onChange={(e) => setSettings({ ...settings, favicon: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
        </div>
        <Button onClick={saveSettings} className="gradient-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" />Save Settings</Button>
      </div>

      {/* About Section */}
      <div className="glass rounded-2xl p-6 border border-border space-y-4">
        <h3 className="text-lg font-bold text-foreground">About Section</h3>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Bio Text</label>
          <Textarea value={about.bio_text} onChange={(e) => setAbout({ ...about, bio_text: e.target.value })} className="bg-secondary/50 border-border" rows={5} />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Years Experience</label>
            <Input type="number" value={about.years_experience} onChange={(e) => setAbout({ ...about, years_experience: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Projects Completed</label>
            <Input type="number" value={about.projects_completed} onChange={(e) => setAbout({ ...about, projects_completed: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Happy Clients</label>
            <Input type="number" value={about.happy_clients} onChange={(e) => setAbout({ ...about, happy_clients: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Profile Image URL</label>
          <Input value={about.profile_image} onChange={(e) => setAbout({ ...about, profile_image: e.target.value })} className="bg-secondary/50 border-border" />
        </div>
        <Button onClick={saveAbout} className="gradient-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" />Save About</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
