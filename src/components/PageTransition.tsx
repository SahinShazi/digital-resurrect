import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const timer = setTimeout(() => setIsVisible(true), 40);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(24px) scale(0.99)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
