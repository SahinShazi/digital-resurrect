import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setVisible(false);
    setAnimating(true);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const showTimer = setTimeout(() => setVisible(true), 40);
    // After the animation completes, remove transform/willChange so it
    // doesn't create a containing block (which would break `position: fixed`
    // on the Navbar and cause it to scroll away).
    const doneTimer = setTimeout(() => setAnimating(false), 800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(doneTimer);
    };
  }, [location.pathname]);

  if (!animating) return <>{children}</>;

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px) scale(0.99)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
