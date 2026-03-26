import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check if user is admin
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");

      if (roleError || !roles || roles.length === 0) {
        await supabase.auth.signOut();
        throw new Error("Access denied. Admin privileges required.");
      }

      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 border border-border">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-1">Restricted area — authorized only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="h-12 bg-secondary/50 border-border focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12 bg-secondary/50 border-border focus:border-primary"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 gradient-primary text-primary-foreground font-semibold rounded-xl"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
