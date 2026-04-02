import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, Upload } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { useRef } from "react";

const ResumeUpload = ({ value, onChange }: { value: string; onChange: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "Error", description: "File size must be under 10MB", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `resume/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("portfolio-assets").upload(fileName, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("portfolio-assets").getPublicUrl(fileName);
    onChange(urlData.publicUrl);
    toast({ title: "Resume uploaded!" });
    setUploading(false);
  };

  return (
    <>
      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} className="hidden" />
      <Button type="button" variant="outline" size="icon" onClick={() => fileRef.current?.click()} disabled={uploading} className="border-border flex-shrink-0">
        {uploading ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
      </Button>
    </>
  );
};

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    id: "",
    site_title: "",
    hero_title: "",
    hero_subtitle: "",
    hero_background_image: "",
    logo_image: "",
    favicon: "",
    resume_url: "",
  });
  const [about, setAbout] = useState({
    id: "",
    bio_text: "",
    years_experience: 0,
    projects_completed: 0,
    happy_clients: 0,
    profile_image: "",
  });
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [settingsRes, aboutRes, socialRes] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).single(),
      supabase.from("about_section").select("*").limit(1).single(),
      supabase.from("social_links").select("*").order("display_order"),
    ]);
    if (settingsRes.data) setSettings({
      ...settingsRes.data,
      hero_subtitle: settingsRes.data.hero_subtitle || "",
      hero_background_image: settingsRes.data.hero_background_image || "",
      logo_image: settingsRes.data.logo_image || "",
      favicon: settingsRes.data.favicon || "",
      resume_url: (settingsRes.data as any).resume_url || "",
    });
    if (aboutRes.data) setAbout({
      ...aboutRes.data,
      profile_image: aboutRes.data.profile_image || "",
    });
    if (socialRes.data) setSocialLinks(socialRes.data);
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
      resume_url: settings.resume_url || null,
    } as any).eq("id", settings.id);
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

  const addSocialLink = async () => {
    const { data, error } = await supabase.from("social_links").insert({
      platform: "New Platform",
      url: "https://",
      icon: "Globe",
      display_order: socialLinks.length,
    }).select().single();
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    if (data) setSocialLinks([...socialLinks, data]);
  };

  const updateSocialLink = async (id: string, field: string, value: string) => {
    setSocialLinks(socialLinks.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const saveSocialLink = async (link: any) => {
    const { error } = await supabase.from("social_links").update({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      display_order: link.display_order,
    }).eq("id", link.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Social link saved!" });
  };

  const deleteSocialLink = async (id: string) => {
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setSocialLinks(socialLinks.filter(l => l.id !== id));
    toast({ title: "Social link deleted!" });
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
          <ImageUpload value={settings.logo_image} onChange={(url) => setSettings({ ...settings, logo_image: url })} label="Logo Image" folder="site" />
          <ImageUpload value={settings.favicon} onChange={(url) => setSettings({ ...settings, favicon: url })} label="Favicon" folder="site" />
        </div>
        <ImageUpload value={settings.hero_background_image} onChange={(url) => setSettings({ ...settings, hero_background_image: url })} label="Hero Profile Image (Home Section)" folder="hero" />
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Resume/CV (PDF)</label>
          <div className="flex gap-2">
            <Input value={settings.resume_url} onChange={(e) => setSettings({ ...settings, resume_url: e.target.value })} placeholder="Resume URL or upload" className="bg-secondary/50 border-border flex-1" />
            <ResumeUpload value={settings.resume_url} onChange={(url) => setSettings({ ...settings, resume_url: url })} />
          </div>
          {settings.resume_url && <p className="text-xs text-muted-foreground mt-1 truncate">Current: {settings.resume_url}</p>}
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
        <ImageUpload value={about.profile_image} onChange={(url) => setAbout({ ...about, profile_image: url })} label="Profile Image" folder="profile" />
        <Button onClick={saveAbout} className="gradient-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" />Save About</Button>
      </div>

      {/* Social Links */}
      <div className="glass rounded-2xl p-6 border border-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Social Links</h3>
          <Button onClick={addSocialLink} size="sm" className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" />Add</Button>
        </div>
        <p className="text-xs text-muted-foreground">Icon options: Github, Linkedin, Twitter, Globe</p>
        {socialLinks.map((link) => (
          <div key={link.id} className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-secondary/30 border border-border">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Platform</label>
                <Input value={link.platform} onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)} className="bg-secondary/50 border-border" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Icon</label>
                <Input value={link.icon} onChange={(e) => updateSocialLink(link.id, "icon", e.target.value)} className="bg-secondary/50 border-border" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-muted-foreground">URL</label>
                <Input value={link.url} onChange={(e) => updateSocialLink(link.id, "url", e.target.value)} className="bg-secondary/50 border-border" />
              </div>
            </div>
            <div className="flex sm:flex-col gap-2 justify-end">
              <Button onClick={() => saveSocialLink(link)} size="sm" variant="outline" className="border-border"><Save className="w-4 h-4" /></Button>
              <Button onClick={() => deleteSocialLink(link.id)} size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
