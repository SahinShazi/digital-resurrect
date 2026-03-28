import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  live_link: string | null;
  github_link: string | null;
  display_order: number;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("display_order");
    if (data) setProjects(data);
  };

  const emptyProject: Project = {
    id: "", title: "", description: "", image: null,
    technologies: [], live_link: null, github_link: null, display_order: projects.length,
  };

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;

    if (isNew) {
      const { error } = await supabase.from("projects").insert(rest);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("projects").update(rest).eq("id", id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }

    toast({ title: isNew ? "Project added!" : "Project updated!" });
    setEditing(null);
    setIsNew(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    toast({ title: "Project deleted" });
    fetchProjects();
  };

  if (editing) {
    return (
      <div className="glass rounded-2xl p-6 border border-border space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-foreground">{isNew ? "Add Project" : "Edit Project"}</h3>
          <Button variant="ghost" size="icon" onClick={() => { setEditing(null); setIsNew(false); }}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Title</label>
            <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
          <ImageUpload value={editing.image || ""} onChange={(url) => setEditing({ ...editing, image: url })} label="Project Image" folder="projects" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Description</label>
          <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-secondary/50 border-border" rows={3} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Live Link</label>
            <Input value={editing.live_link || ""} onChange={(e) => setEditing({ ...editing, live_link: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">GitHub Link</label>
            <Input value={editing.github_link || ""} onChange={(e) => setEditing({ ...editing, github_link: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Technologies (comma separated)</label>
          <Input value={editing.technologies.join(", ")} onChange={(e) => setEditing({ ...editing, technologies: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })} className="bg-secondary/50 border-border" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Display Order</label>
          <Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border w-32" />
        </div>
        <Button onClick={handleSave} className="gradient-primary text-primary-foreground">
          <Save className="w-4 h-4 mr-2" />Save
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Projects ({projects.length})</h3>
        <Button onClick={() => { setEditing(emptyProject); setIsNew(true); }} className="gradient-primary text-primary-foreground" size="sm">
          <Plus className="w-4 h-4 mr-2" />Add Project
        </Button>
      </div>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {p.image && <img src={p.image} alt={p.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{p.title}</p>
                <p className="text-sm text-muted-foreground truncate">{p.technologies.join(", ")}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="ghost" size="icon" onClick={() => setEditing(p)}><Pencil className="w-4 h-4 text-primary" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-center text-muted-foreground py-8">No projects yet. Add your first one!</p>}
      </div>
    </div>
  );
};

export default AdminProjects;
