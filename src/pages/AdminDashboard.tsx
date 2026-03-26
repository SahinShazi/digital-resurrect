import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FolderKanban, Wrench, Briefcase, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminSkills from "@/components/admin/AdminSkills";
import AdminExperiences from "@/components/admin/AdminExperiences";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out" });
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-lg font-bold font-display gradient-text">Admin Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-secondary border border-border w-full justify-start overflow-x-auto">
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <FolderKanban className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Wrench className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="experiences" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Briefcase className="w-4 h-4 mr-2" />
              Experiences
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects"><AdminProjects /></TabsContent>
          <TabsContent value="skills"><AdminSkills /></TabsContent>
          <TabsContent value="experiences"><AdminExperiences /></TabsContent>
          <TabsContent value="settings"><AdminSettings /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
