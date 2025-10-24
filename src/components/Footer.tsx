import { Github, Linkedin, Youtube, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/SahinShazi", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sahinenam?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Sahin_Tech_1", label: "Twitter" },
  ];

  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by{" "}
              <span className="font-semibold gradient-text">Sahin Enam</span>
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
