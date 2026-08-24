"use client";

import { Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-forest-950 border-t border-forest-800 text-xs font-mono text-text-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-bright" />
          <span>Yuvraj Bisht &copy; {currentYear} &bull; All Rights Reserved</span>
        </div>

        <div className="flex items-center gap-4 text-text-secondary">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-emerald-bright transition-colors bg-transparent border-none p-0 text-xs font-mono text-text-secondary cursor-pointer"
          >
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
