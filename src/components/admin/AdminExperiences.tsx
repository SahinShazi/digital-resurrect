import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  display_order: number;
}

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchExperiences(); }, []);

  const fetchExperiences = async () => {
    const { data } = await supabase.from("experiences").select("*").order("display_order");
    if (data) setExperiences(data);
  };

  const emptyExp: Experience = {
    id: "", title: "", company: "", location: "", period: "",
    description: "", achievements: [], display_order: experiences.length,
  };

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (isNew) {
      const { error } = await supabase.from("experiences").insert(rest);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("experiences").update(rest).eq("id", id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: isNew ? "Experience added!" : "Experience updated!" });
    setEditing(null); setIsNew(false); fetchExperiences();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await supabase.from("experiences").delete().eq("id", id);
    toast({ title: "Experience deleted" }); fetchExperiences();
  };

  if (editing) {
    return (
      <div className="glass rounded-2xl p-6 border border-border space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-foreground">{isNew ? "Add Experience" : "Edit Experience"}</h3>
          <Button variant="ghost" size="icon" onClick={() => { setEditing(null); setIsNew(false); }}><X className="w-5 h-5" /></Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Job Title</label>
            <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Company</label>
            <Input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Location</label>
            <Input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Period</label>
            <Input value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} placeholder="2022 - Present" className="bg-secondary/50 border-border" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Description</label>
          <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-secondary/50 border-border" rows={3} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Achievements (one per line)</label>
          <Textarea
            value={editing.achievements.join("\n")}
            onChange={(e) => setEditing({ ...editing, achievements: e.target.value.split("\n").filter(Boolean) })}
            className="bg-secondary/50 border-border" rows={4}
            placeholder="Achievement 1&#10;Achievement 2"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Display Order</label>
          <Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border w-32" />
        </div>
        <Button onClick={handleSave} className="gradient-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" />Save</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Experiences ({experiences.length})</h3>
        <Button onClick={() => { setEditing(emptyExp); setIsNew(true); }} className="gradient-primary text-primary-foreground" size="sm">
          <Plus className="w-4 h-4 mr-2" />Add Experience
        </Button>
      </div>
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="glass rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{exp.title}</p>
              <p className="text-sm text-primary">{exp.company}</p>
              <p className="text-xs text-muted-foreground">{exp.period} · {exp.location}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="ghost" size="icon" onClick={() => setEditing(exp)}><Pencil className="w-4 h-4 text-primary" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {experiences.length === 0 && <p className="text-center text-muted-foreground py-8">No experiences yet.</p>}
      </div>
    </div>
  );
};

export default AdminExperiences;
