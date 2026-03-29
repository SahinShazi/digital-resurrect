import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { supabase } from "@/integrations/supabase/client";

// Dynamic favicon
supabase.from("site_settings").select("favicon").limit(1).single().then(({ data }) => {
  if (data?.favicon) {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = data.favicon;
  }
});

createRoot(document.getElementById("root")!).render(<App />);
