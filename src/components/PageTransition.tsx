import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [phase, setPhase] = useState<"enter" | "idle">("enter");

  useEffect(() => {
    setPhase("enter");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const showTimer = setTimeout(() => setPhase("idle"), 40);
    // After the animation completes, clear transform so it doesn't create
    // a containing block (which would break `position: fixed` for the navbar).
    const clearTimer = setTimeout(() => setPhase("idle"), 800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(clearTimer);
    };
  }, [location.pathname]);

  // While entering, animate; once idle, render with no transform/willChange
  // so descendants using `position: fixed` (Navbar) anchor to the viewport.
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 800);
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (!animating) {
    return <>{children}</>;
  }

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity: phase === "idle" ? 1 : 0,
        transform: phase === "idle" ? "none" : "translateY(24px) scale(0.99)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
