"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Terminal, Code2, Database, BrainCircuit, Wrench, ShieldCheck } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import TiltCard from "../ui/TiltCard";
import { SkillCategory } from "@/lib/types";

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Testing & QA",
    iconName: "ShieldCheck",
    skills: [
      { name: "Playwright", level: "Expert", highlight: true },
      { name: "Cypress", level: "Advanced", highlight: true },
      { name: "Accessibility (a11y)", level: "Advanced", highlight: true },
      { name: "E2E Test Architecture", level: "Advanced" },
      { name: "API Testing (Postman)", level: "Advanced" },
      { name: "Test Case Design", level: "Advanced" },
      { name: "data-cy Standardization", level: "Advanced" },
    ],
  },
  {
    title: "Languages & Databases",
    iconName: "Code2",
    skills: [
      { name: "Golang", level: "Advanced", highlight: true },
      { name: "Python", level: "Advanced", highlight: true },
      { name: "SQL / MySQL", level: "Advanced", highlight: true },
      { name: "TypeScript", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
      { name: "JavaScript (ES6+)", level: "Advanced" },
    ],
  },
  {
    title: "Frameworks & Web",
    iconName: "Database",
    skills: [
      { name: "FastAPI", level: "Advanced", highlight: true },
      { name: "Gin (Go)", level: "Advanced", highlight: true },
      { name: "ReactJS", level: "Advanced", highlight: true },
      { name: "Next.js 14+", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "jQuery", level: "Proficient" },
    ],
  },
  {
    title: "AI & ML / RAG",
    iconName: "BrainCircuit",
    skills: [
      { name: "RAG Pipelines", level: "Advanced", highlight: true },
      { name: "LangChain", level: "Advanced", highlight: true },
      { name: "OpenAI API", level: "Advanced", highlight: true },
      { name: "ChromaDB", level: "Advanced", highlight: true },
      { name: "Vector Search", level: "Advanced" },
      { name: "Prompt Engineering", level: "Advanced" },
    ],
  },
  {
    title: "DevOps & Tools",
    iconName: "Wrench",
    skills: [
      { name: "Git / GitHub", level: "Advanced", highlight: true },
      { name: "Power BI", level: "Advanced", highlight: true },
      { name: "Docker", level: "Intermediate" },
      { name: "Linux CLI", level: "Advanced" },
      { name: "Postman", level: "Advanced" },
      { name: "Excel Analytics", level: "Advanced" },
    ],
  },
];

export default function Skills() {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="h-5 w-5 text-emerald-bright" />;
      case "Code2":
        return <Code2 className="h-5 w-5 text-emerald-bright" />;
      case "Database":
        return <Database className="h-5 w-5 text-gold-accent" />;
      case "BrainCircuit":
        return <BrainCircuit className="h-5 w-5 text-emerald-bright" />;
      default:
        return <Wrench className="h-5 w-5 text-gold-accent" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-forest-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="TECHNICAL STACK"
          title="Skills & Core Capabilities"
          description="A comprehensive toolkit across automated testing, full-stack development, and applied artificial intelligence."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
          <button
            onClick={() => setSelectedCategoryIdx(null)}
            className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
              selectedCategoryIdx === null
                ? "bg-emerald-accent text-forest-950 font-bold shadow-emerald-glow"
                : "bg-forest-850 hover:bg-forest-800 text-text-secondary border border-forest-750"
            }`}
          >
            All Skills ({SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategoryIdx(idx)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all flex items-center gap-2 ${
                selectedCategoryIdx === idx
                  ? "bg-emerald-accent text-forest-950 font-bold shadow-emerald-glow"
                  : "bg-forest-850 hover:bg-forest-800 text-text-secondary border border-forest-750"
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.filter((_, idx) =>
            selectedCategoryIdx === null ? true : selectedCategoryIdx === idx
          ).map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <TiltCard className="h-full space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-forest-750">
                  <div className="p-2 rounded-lg bg-forest-800 border border-forest-700">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <h3 className="font-sans font-bold text-lg text-text-primary">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border cursor-pointer transition-colors ${
                        skill.highlight
                          ? "bg-forest-800/90 text-emerald-bright border-emerald-accent/40 shadow-sm"
                          : "bg-forest-950/70 text-text-secondary border-forest-750 hover:border-text-secondary"
                      }`}
                      data-cursor={skill.name}
                    >
                      {skill.highlight && (
                        <CheckCircle2 className="h-3 w-3 text-emerald-bright shrink-0" />
                      )}
                      <span>{skill.name}</span>
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
