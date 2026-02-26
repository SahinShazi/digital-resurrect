import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.hireMe": "Hire Me",

    // Hero
    "hero.available": "Available for work",
    "hero.greeting": "Hi, I'm",
    "hero.name": "Sahin Enam",
    "hero.role": "Frontend Developer",
    "hero.description": "I craft beautiful, responsive web experiences with clean code and modern technologies. Passionate about creating digital products that make a difference.",
    "hero.viewProjects": "View Projects",
    "hero.resume": "Resume",
    "hero.scroll": "Scroll",
    "hero.yearsExp": "2+ Years Exp",
    "hero.projects": "50+ Projects",

    // About
    "about.badge": "About Me",
    "about.heading": "Get to know me better",
    "about.subtitle": "Professional Web Developer",
    "about.p1": "Hello! I'm Sahin Enam, a passionate Full Stack Web Developer with experience creating digital solutions that make a difference. I specialize in building scalable web applications using modern technologies like React, Node.js, and MongoDB.",
    "about.p2": "My journey in web development started with a curiosity about how websites work, and it has evolved into a career where I get to solve complex problems and create user-friendly experiences every day.",
    "about.p3": "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.",
    "about.cta": "Let's work together",
    "about.stat1": "Years Experience",
    "about.stat2": "Projects Completed",
    "about.stat3": "Happy Clients",

    // Skills
    "skills.badge": "My Skills",
    "skills.heading": "Technical Expertise",
    "skills.subtitle": "Technologies I use to bring ideas to life",

    // Experience
    "experience.badge": "Experience",
    "experience.heading": "My Professional Journey",
    "experience.subtitle": "A timeline of my career growth and achievements",

    // Projects
    "projects.badge": "My Work",
    "projects.heading": "Featured Projects",
    "projects.subtitle": "Some of my recent work that I'm proud of",
    "projects.viewAll": "View All on GitHub",

    // Testimonials
    "testimonials.badge": "Testimonials",
    "testimonials.heading": "What Clients Say",
    "testimonials.subtitle": "Don't just take my word for it",

    // Contact
    "contact.badge": "Contact",
    "contact.heading": "Get In Touch",
    "contact.subtitle": "Have a project in mind? Let's discuss how we can work together.",
    "contact.leftTitle": "Let's work together",
    "contact.leftDesc": "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.nameLabel": "Your Name",
    "contact.emailLabel": "Your Email",
    "contact.subjectLabel": "Subject",
    "contact.messageLabel": "Message",
    "contact.namePlaceholder": "John Doe",
    "contact.emailPlaceholder": "john@example.com",
    "contact.subjectPlaceholder": "Project Inquiry",
    "contact.messagePlaceholder": "Tell me about your project...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.successTitle": "Message sent!",
    "contact.successDesc": "Thank you for reaching out. I'll get back to you soon.",
    "contact.errorTitle": "Error sending message",
    "contact.errorDesc": "Please try again later or contact me directly via email.",

    // Footer
    "footer.role": "Frontend Developer",
    "footer.madeWith": "Made with",
    "footer.by": "by",
    "footer.rights": "All rights reserved.",
  },
  bn: {
    // Navbar
    "nav.home": "হোম",
    "nav.about": "আমার সম্পর্কে",
    "nav.skills": "দক্ষতা",
    "nav.experience": "অভিজ্ঞতা",
    "nav.projects": "প্রকল্প",
    "nav.contact": "যোগাযোগ",
    "nav.hireMe": "নিয়োগ করুন",

    // Hero
    "hero.available": "কাজের জন্য প্রস্তুত",
    "hero.greeting": "আমি",
    "hero.name": "সাহিন এনাম",
    "hero.role": "ফ্রন্টএন্ড ডেভেলপার",
    "hero.description": "আমি আধুনিক প্রযুক্তি ও পরিষ্কার কোড দিয়ে সুন্দর, রেসপন্সিভ ওয়েব অভিজ্ঞতা তৈরি করি। ডিজিটাল পণ্য তৈরি করতে আমি আবেগপ্রবণ।",
    "hero.viewProjects": "প্রকল্প দেখুন",
    "hero.resume": "জীবনবৃত্তান্ত",
    "hero.scroll": "স্ক্রল",
    "hero.yearsExp": "২+ বছর অভিজ্ঞতা",
    "hero.projects": "৫০+ প্রকল্প",

    // About
    "about.badge": "আমার সম্পর্কে",
    "about.heading": "আমাকে আরও ভালোভাবে জানুন",
    "about.subtitle": "পেশাদার ওয়েব ডেভেলপার",
    "about.p1": "হ্যালো! আমি সাহিন এনাম, একজন আবেগপ্রবণ ফুল স্ট্যাক ওয়েব ডেভেলপার। আমি React, Node.js এবং MongoDB-এর মতো আধুনিক প্রযুক্তি ব্যবহার করে স্কেলেবল ওয়েব অ্যাপ্লিকেশন তৈরিতে বিশেষজ্ঞ।",
    "about.p2": "ওয়েব ডেভেলপমেন্টে আমার যাত্রা শুরু হয়েছিল ওয়েবসাইট কীভাবে কাজ করে তার কৌতূহল থেকে, এবং এটি এখন একটি ক্যারিয়ারে পরিণত হয়েছে যেখানে আমি প্রতিদিন জটিল সমস্যা সমাধান করি।",
    "about.p3": "যখন আমি কোডিং করি না, তখন আমি নতুন প্রযুক্তি অন্বেষণ করি, ওপেন-সোর্স প্রকল্পে অবদান রাখি, অথবা ডেভেলপার সম্প্রদায়ের সাথে আমার জ্ঞান ভাগ করি।",
    "about.cta": "একসাথে কাজ করি",
    "about.stat1": "বছরের অভিজ্ঞতা",
    "about.stat2": "সম্পন্ন প্রকল্প",
    "about.stat3": "সন্তুষ্ট ক্লায়েন্ট",

    // Skills
    "skills.badge": "আমার দক্ষতা",
    "skills.heading": "কারিগরি দক্ষতা",
    "skills.subtitle": "যে প্রযুক্তিগুলো দিয়ে আমি আইডিয়া বাস্তবে রূপ দিই",

    // Experience
    "experience.badge": "অভিজ্ঞতা",
    "experience.heading": "আমার পেশাদার যাত্রা",
    "experience.subtitle": "আমার ক্যারিয়ার বৃদ্ধি ও অর্জনের টাইমলাইন",

    // Projects
    "projects.badge": "আমার কাজ",
    "projects.heading": "বৈশিষ্ট্যযুক্ত প্রকল্প",
    "projects.subtitle": "আমার সাম্প্রতিক কিছু কাজ যা নিয়ে আমি গর্বিত",
    "projects.viewAll": "GitHub-এ সব দেখুন",

    // Testimonials
    "testimonials.badge": "প্রশংসাপত্র",
    "testimonials.heading": "ক্লায়েন্টরা কী বলেন",
    "testimonials.subtitle": "শুধু আমার কথায় বিশ্বাস করবেন না",

    // Contact
    "contact.badge": "যোগাযোগ",
    "contact.heading": "যোগাযোগ করুন",
    "contact.subtitle": "কোনো প্রকল্পের পরিকল্পনা আছে? আসুন আলোচনা করি কীভাবে একসাথে কাজ করতে পারি।",
    "contact.leftTitle": "একসাথে কাজ করি",
    "contact.leftDesc": "আমি সবসময় নতুন প্রকল্প, সৃজনশীল আইডিয়া বা সুযোগ নিয়ে আলোচনা করতে প্রস্তুত। নির্দ্বিধায় যোগাযোগ করুন!",
    "contact.email": "ইমেইল",
    "contact.location": "অবস্থান",
    "contact.nameLabel": "আপনার নাম",
    "contact.emailLabel": "আপনার ইমেইল",
    "contact.subjectLabel": "বিষয়",
    "contact.messageLabel": "বার্তা",
    "contact.namePlaceholder": "আপনার নাম লিখুন",
    "contact.emailPlaceholder": "your@email.com",
    "contact.subjectPlaceholder": "প্রকল্প সম্পর্কে জিজ্ঞাসা",
    "contact.messagePlaceholder": "আপনার প্রকল্প সম্পর্কে বলুন...",
    "contact.send": "বার্তা পাঠান",
    "contact.sending": "পাঠানো হচ্ছে...",
    "contact.successTitle": "বার্তা পাঠানো হয়েছে!",
    "contact.successDesc": "যোগাযোগ করার জন্য ধন্যবাদ। আমি শীঘ্রই উত্তর দেব।",
    "contact.errorTitle": "বার্তা পাঠাতে ত্রুটি",
    "contact.errorDesc": "পরে আবার চেষ্টা করুন অথবা সরাসরি ইমেইলে যোগাযোগ করুন।",

    // Footer
    "footer.role": "ফ্রন্টএন্ড ডেভেলপার",
    "footer.madeWith": "তৈরি করেছেন",
    "footer.by": "",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
