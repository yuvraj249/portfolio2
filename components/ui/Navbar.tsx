"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, FileDown, Code2, Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "stats", label: "Live Stats" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full px-5 py-3 transition-all duration-300 border flex items-center justify-between ${
          scrolled
            ? "bg-forest-900/85 backdrop-blur-md border-forest-750/80 shadow-2xl shadow-black/50"
            : "bg-forest-950/40 backdrop-blur-sm border-forest-800/40"
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
          data-cursor="YB"
        >
          <div className="h-8 w-8 rounded-lg bg-forest-800 border border-emerald-accent/40 flex items-center justify-center text-emerald-accent group-hover:border-emerald-bright transition-colors shadow-emerald-glow">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm text-text-primary group-hover:text-emerald-bright transition-colors tracking-tight">
              YUVRAJ BISHT
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              CSE &bull; QA &bull; AI
            </span>
          </div>
        </a>

        {/* Desktop Nav Items with LayoutId Sliding Active Indicator Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-forest-850/80 border border-forest-750 px-2 py-1 rounded-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono transition-colors duration-200 rounded-full ${
                  isActive ? "text-emerald-bright font-semibold" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-forest-750 border border-emerald-accent/30 rounded-full shadow-emerald-glow z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button & Status Pill */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-forest-800/60 border border-forest-750 text-[11px] font-mono text-emerald-bright">
            <span className="h-2 w-2 rounded-full bg-emerald-bright animate-ping" />
            <span>Open for roles</span>
          </div>

          <MagneticButton href="/resume.pdf" download>
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-accent hover:bg-emerald-bright text-forest-950 font-mono font-bold text-xs transition-all shadow-emerald-glow active:scale-95">
              <FileDown className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-forest-800 border border-forest-750 text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden mt-3 max-w-6xl mx-auto rounded-2xl bg-forest-900 border border-forest-750 p-5 shadow-2xl space-y-3"
        >
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-mono transition-colors ${
                  activeSection === item.id
                    ? "bg-forest-800 text-emerald-bright font-bold border border-emerald-accent/30"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-forest-750 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-bright flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-bright animate-pulse" />
              Available for roles
            </span>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-accent text-forest-950 font-mono text-xs font-bold"
            >
              <FileDown className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
