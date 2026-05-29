// Deprecated: multi-language support removed. This stub keeps imports safe.
import { ReactNode } from "react";

export const LanguageProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export const useLanguage = () => ({
  lang: "en" as const,
  setLang: (_: "en") => {},
  t: (key: string) => key,
});
