"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Database, BrainCircuit, GraduationCap, MapPin } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import TiltCard from "../ui/TiltCard";

export default function About() {
  return (
    <section id="about" className="py-24 bg-forest-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="BIOGRAPHY"
          title="Bridging Test Automation, Backends & Applied AI"
          description="Crafting resilient digital products through rigorous end-to-end testing, performant backend microservices, and modern vector retrieval pipelines."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Card */}
          <div className="lg:col-span-7">
            <TiltCard className="h-full space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 text-emerald-bright">
                  <GraduationCap className="h-3.5 w-3.5" />
                  B.Tech CSE (8.26 CGPA)
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 text-gold-accent">
                  <MapPin className="h-3.5 w-3.5" />
                  Vadodara, Gujarat, India
                </span>
              </div>

              <p className="text-text-primary text-base leading-relaxed font-sans font-normal">
                I am a <strong>Software Developer and QA Automation Engineer</strong> with hands-on experience in 
                building robust automated test suites, developing scalable backend APIs, and implementing applied AI tools. 
                My philosophy centers on <strong>zero-flakiness test coverage</strong> and <strong>high-efficiency code execution</strong>.
              </p>

              <p className="text-text-secondary text-sm font-mono leading-relaxed">
                Whether automating complex enterprise workflows using Playwright and Cypress at EXXAT Group and Infilon Technologies, 
                authoring Golang microservices with JWT role-based access control, or developing RAG-driven AI codebase assistants like 
                <strong className="text-emerald-bright"> CodeMind</strong>, I focus on shipping code that scales cleanly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-forest-750">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-bright shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-text-primary">E2E & A11y Automation</h4>
                    <p className="text-[12px] font-mono text-text-muted mt-0.5">
                      Playwright, Cypress, WCAG AA Accessibility, API validation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-bright shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-text-primary">Backend & Microservices</h4>
                    <p className="text-[12px] font-mono text-text-muted mt-0.5">
                      Golang (Gin), Python (FastAPI), MySQL, REST APIs
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Core Focus Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard glowColor="gold">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-gold-accent/10 border border-gold-accent/40 flex items-center justify-center text-gold-accent shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-mono font-bold text-text-primary">Test Engineering & QA</h3>
                  <p className="text-xs font-mono text-text-secondary mt-1 leading-normal">
                    Standardizing <code className="text-emerald-bright">data-cy</code> selectors, async request interceptors, and web accessibility audits.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard glowColor="emerald">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-accent/10 border border-emerald-accent/40 flex items-center justify-center text-emerald-accent shrink-0">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-mono font-bold text-text-primary">Full-Stack Development</h3>
                  <p className="text-xs font-mono text-text-secondary mt-1 leading-normal">
                    Building Go/FastAPI backends with JWT authentication and responsive React interfaces.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard glowColor="emerald">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-accent/10 border border-emerald-accent/40 flex items-center justify-center text-emerald-accent shrink-0">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-mono font-bold text-text-primary">Applied AI & Vector RAG</h3>
                  <p className="text-xs font-mono text-text-secondary mt-1 leading-normal">
                    Ingesting code repositories with ChromaDB vector stores, OpenAI embeddings, and LangChain QA chains.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
