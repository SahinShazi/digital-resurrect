import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  icon: string;
  percentage: number;
  display_order: number;
}

const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    const { data } = await supabase.from("skills").select("*").order("display_order");
    if (data) setSkills(data);
  };

  const emptySkill: Skill = { id: "", name: "", icon: "Code2", percentage: 50, display_order: skills.length };

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (isNew) {
      const { error } = await supabase.from("skills").insert(rest);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("skills").update(rest).eq("id", id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: isNew ? "Skill added!" : "Skill updated!" });
    setEditing(null); setIsNew(false); fetchSkills();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await supabase.from("skills").delete().eq("id", id);
    toast({ title: "Skill deleted" }); fetchSkills();
  };

  if (editing) {
    return (
      <div className="glass rounded-2xl p-6 border border-border space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-foreground">{isNew ? "Add Skill" : "Edit Skill"}</h3>
          <Button variant="ghost" size="icon" onClick={() => { setEditing(null); setIsNew(false); }}><X className="w-5 h-5" /></Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Name</label>
            <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="bg-secondary/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Icon (lucide name)</label>
            <Input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="bg-secondary/50 border-border" placeholder="e.g. Code2, Globe, Database" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Percentage ({editing.percentage}%)</label>
            <Input type="range" min={0} max={100} value={editing.percentage} onChange={(e) => setEditing({ ...editing, percentage: parseInt(e.target.value) })} className="bg-secondary/50" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Display Order</label>
            <Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border w-32" />
          </div>
        </div>
        <Button onClick={handleSave} className="gradient-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" />Save</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Skills ({skills.length})</h3>
        <Button onClick={() => { setEditing(emptySkill); setIsNew(true); }} className="gradient-primary text-primary-foreground" size="sm">
          <Plus className="w-4 h-4 mr-2" />Add Skill
        </Button>
      </div>
      <div className="space-y-3">
        {skills.map((s) => (
          <div key={s.id} className="glass rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-foreground">{s.name}</p>
                <span className="text-sm font-bold text-primary">{s.percentage}%</span>
              </div>
              <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${s.percentage}%` }} />
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="ghost" size="icon" onClick={() => setEditing(s)}><Pencil className="w-4 h-4 text-primary" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-center text-muted-foreground py-8">No skills yet.</p>}
      </div>
    </div>
  );
};

export default AdminSkills;
