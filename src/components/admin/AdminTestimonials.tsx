import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  display_order: number;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*").order("display_order");
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setTestimonials(data || []);
    setLoading(false);
  };

  const startNew = () => {
    setEditing({ id: "", name: "", role: "", content: "", avatar: "", rating: 5, display_order: testimonials.length + 1 });
    setIsNew(true);
  };

  const startEdit = (t: Testimonial) => {
    setEditing({ ...t });
    setIsNew(false);
  };

  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing) return;
    if (isNew) {
      const { error } = await supabase.from("testimonials").insert({
        name: editing.name,
        role: editing.role,
        content: editing.content,
        avatar: editing.avatar,
        rating: editing.rating,
        display_order: editing.display_order,
      });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Testimonial added!" });
    } else {
      const { error } = await supabase.from("testimonials").update({
        name: editing.name,
        role: editing.role,
        content: editing.content,
        avatar: editing.avatar,
        rating: editing.rating,
        display_order: editing.display_order,
      }).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Testimonial updated!" });
    }
    cancel();
    fetchTestimonials();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Testimonial deleted!" });
    fetchTestimonials();
  };

  if (loading) return <div className="text-center text-muted-foreground py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-foreground">Testimonials ({testimonials.length})</h3>
        <Button onClick={startNew} className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Testimonial</Button>
      </div>

      {editing && (
        <div className="glass rounded-2xl p-6 border border-primary/30 space-y-4">
          <h4 className="font-semibold text-foreground">{isNew ? "New Testimonial" : "Edit Testimonial"}</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Name</label>
              <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="bg-secondary/50 border-border" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Role / Company</label>
              <Input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="bg-secondary/50 border-border" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Content</label>
            <Textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="bg-secondary/50 border-border" rows={3} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Avatar (initials)</label>
              <Input value={editing.avatar} onChange={(e) => setEditing({ ...editing, avatar: e.target.value })} className="bg-secondary/50 border-border" placeholder="SJ" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Rating (1-5)</label>
              <Input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} className="bg-secondary/50 border-border" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Display Order</label>
              <Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={save} className="gradient-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" />Save</Button>
            <Button onClick={cancel} variant="outline"><X className="w-4 h-4 mr-2" />Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="glass rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">{t.avatar}</div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{t.name}</p>
                <p className="text-sm text-muted-foreground truncate">{t.role}</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={() => startEdit(t)}><Pencil className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" onClick={() => remove(t.id)} className="text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
