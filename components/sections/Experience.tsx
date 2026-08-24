"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import TiltCard from "../ui/TiltCard";
import { ExperienceItem } from "@/lib/types";

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "EXXAT Group",
    role: "Engineering Intern",
    location: "Vadodara, India",
    period: "May 2026 – Aug 2026",
    type: "Internship",
    active: true,
    achievements: [
      "Wrote and executed automated test cases using Playwright for end-to-end QA testing of enterprise web applications.",
      "Identified, isolated, and reported critical functional and accessibility (a11y) issues across application components.",
      "Contributed directly to UI development work focused on adding WCAG accessibility features to frontend components.",
    ],
    tech: ["Playwright", "Accessibility (a11y)", "UI Development", "E2E Automation", "Bug Tracking"],
  },
  {
    company: "Infilon Technologies",
    role: "Software Engineer Trainee",
    location: "Vadodara, India",
    period: "Sep 2025 – Mar 2026",
    type: "Full-time",
    achievements: [
      "Developed and maintained end-to-end test automation with Cypress for ERP modules, implementing API-based coverage across core workflows.",
      "Debugged test cases involving async requests and dynamic DOM rendering; standardized data-cy selectors across the codebase for 100% test reliability.",
      "Performed regression testing, API CRUD validation, and workflow testing while contributing React frontend enhancements.",
      "Built a full-stack Product Catalogue application featuring a Golang backend API and JavaScript frontend.",
    ],
    tech: ["Cypress", "Golang (Gin)", "ReactJS", "API Testing", "data-cy Selectors", "Regression Testing"],
  },
  {
    company: "Tactree LLP (KPO / Analytics)",
    role: "Data Analyst",
    location: "Vadodara, India",
    period: "Nov 2024 – Mar 2025",
    type: "Contract",
    achievements: [
      "Analyzed complex datasets and built interactive Power BI and Excel dashboards to track executive KPIs.",
      "Cleaned and transformed large datasets using SQL queries and Python scripts; automated routine data pipelines to improve reporting speed.",
    ],
    tech: ["SQL", "Python", "Power BI", "Data Cleaning", "Excel Analytics", "ETL Pipelines"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-forest-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-4">
            <SectionHeader
              badge="WORK HISTORY"
              title="Professional Experience"
              description="Demonstrated impact across engineering internships, QA test automation, backend microservice creation, and data analytics."
            />

            <div className="p-4 rounded-xl bg-forest-850 border border-forest-750 font-mono text-xs text-text-secondary space-y-3">
              <div className="flex items-center gap-2 text-emerald-bright font-bold">
                <Building2 className="h-4 w-4" />
                <span>Track Record Highlights</span>
              </div>
              <p className="text-[12px] leading-relaxed">
                Specialized in reducing test suite flakiness, standardizing QA infrastructure, and bridging backend APIs with frontends.
              </p>
            </div>
          </div>

          {/* Right Experience Timeline */}
          <div className="lg:col-span-8 space-y-8 relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-forest-750 hidden sm:block" />

            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative sm:pl-14"
              >
                {/* Timeline Icon Node */}
                <div className="absolute left-3.5 top-6 -translate-x-1/2 h-5 w-5 rounded-full bg-forest-800 border-2 border-emerald-bright hidden sm:flex items-center justify-center text-emerald-bright shadow-emerald-glow">
                  <div className="h-2 w-2 rounded-full bg-emerald-bright" />
                </div>

                <TiltCard glowColor={exp.active ? "emerald" : "gold"} className="space-y-4">
                  {/* Top Bar: Role & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-forest-750 pb-3">
                    <div>
                      <h3 className="text-xl font-sans font-bold text-text-primary flex items-center gap-2">
                        <span>{exp.role}</span>
                        {exp.active && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-accent/20 text-emerald-bright text-[10px] font-mono border border-emerald-accent/40">
                            Recent
                          </span>
                        )}
                      </h3>
                      <div className="text-sm font-mono text-emerald-bright font-semibold mt-0.5 flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gold-accent" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Bullet Achievements */}
                  <ul className="space-y-2 text-xs sm:text-sm font-mono text-text-secondary">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-bright shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Chips */}
                  <div className="pt-3 border-t border-forest-750 flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded bg-forest-950 text-[11px] font-mono text-text-code border border-forest-750"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
