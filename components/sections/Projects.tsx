"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight, CheckCircle2, FileDown, FileText } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import TiltCard from "../ui/TiltCard";
import { ProjectItem } from "@/lib/types";

const PROJECTS: ProjectItem[] = [
  {
    id: "codemind",
    title: "CodeMind — AI Codebase Assistant",
    subtitle: "RAG Vector Store & Architecture Visualizer",
    description: "RAG-based AI tool that ingests uploaded GitHub/ZIP codebases, answers context-aware questions with OpenAI embeddings & ChromaDB, and renders interactive Mermaid architecture diagrams.",
    detailedBullets: [
      "Engineered vector retrieval pipeline with chunking algorithms and ChromaDB vector store.",
      "Architected FastAPI backend microservices (Ingestion, RAG, and Summary) with a React 18 frontend.",
      "Automated repository scanning and generated dynamic Mermaid.js architecture diagrams.",
    ],
    techStack: ["Python", "FastAPI", "OpenAI API", "LangChain", "ChromaDB", "React 18", "Mermaid.js"],
    githubUrl: "https://github.com/yuvraj249/CodeMind-AI",
    liveUrl: "https://frontend-vert-chi-72.vercel.app",
    featured: true,
    metrics: "Sub-second RAG response time",
    category: "AI & ML",
  },
  {
    id: "product-catalogue",
    title: "Product Catalogue & Inventory API",
    subtitle: "High-Performance Golang Microservice",
    description: "Full-stack inventory management system powered by a Golang Gin backend with JWT authentication, role-based access control (RBAC), and relational MySQL database.",
    detailedBullets: [
      "Implemented secure JWT authentication and granular role-based access control (RBAC).",
      "Designed complete RESTful CRUD APIs for products, suppliers, categories, and stock tracking.",
      "Coupled Golang Gin backend API with a responsive JavaScript frontend interface.",
    ],
    techStack: ["Golang", "Gin", "MySQL", "JWT Auth", "RBAC", "JavaScript"],
    githubUrl: "https://github.com/yuvraj249/Product-Catalogue-API",
    featured: true,
    metrics: "8ms API response latency",
    category: "Full Stack",
  },
  {
    id: "e2e-suite",
    title: "Enterprise E2E Automation Suite",
    subtitle: "Playwright & Cypress QA Architecture",
    description: "Comprehensive automated testing framework targeting complex ERP modules with Playwright and Cypress, featuring accessibility (a11y) audits and standardized DOM selectors.",
    detailedBullets: [
      "Standardized data-cy selectors across dynamic DOM components for 100% reliable test runs.",
      "Integrated automated Axe-core accessibility (a11y) scans into CI pipeline.",
      "Debugged async network requests and prevented regression bugs across core workflows.",
    ],
    techStack: ["Playwright", "Cypress", "TypeScript", "Accessibility (a11y)", "Axe-core", "Postman"],
    featured: true,
    metrics: "Zero-flakiness test runs",
    category: "QA / Automation",
  },
  {
    id: "iot-automation",
    title: "IoT Home Automation System",
    subtitle: "Firmware & Research Paper — IRJMETS Published",
    description: "IoT automation system utilizing ESP8266 & ESP32 microcontrollers over MQTT and HTTP protocols with real-time web & mobile control interfaces.",
    detailedBullets: [
      "Developed backend microservices and micro-controller firmware using C/C++ and Python.",
      "Published peer-reviewed research paper in International Research Journal of Modernization in Engineering Technology and Science (IRJMETS, Vol 7, Mar 2025).",
      "DOI: 10.56726/IRJMETS68876 — Impact Factor: 8.187.",
    ],
    techStack: ["IoT", "ESP8266", "ESP32", "MQTT", "Python", "C/C++", "Research Paper"],
    paperUrl: "/IoT_Home_Automation_Paper.pdf",
    featured: false,
    metrics: "Published IRJMETS Mar 2025",
    category: "IoT / Hardware",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI & ML", "Full Stack", "QA / Automation", "IoT / Hardware"];

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-forest-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FEATURED WORK"
          title="Engineered Projects & Systems"
          description="A showcase of AI tools, backend microservices, test automation suites, and hardware solutions."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
                activeCategory === cat
                  ? "bg-emerald-accent text-forest-950 font-bold shadow-emerald-glow"
                  : "bg-forest-850 hover:bg-forest-800 text-text-secondary border border-forest-750"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <TiltCard glowColor={project.featured ? "emerald" : "gold"} className="h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Category & Metrics Header */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-forest-800 border border-forest-700 text-emerald-bright text-[11px] font-mono">
                      {project.category}
                    </span>

                    {project.metrics && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-gold-accent bg-gold-accent/10 px-2.5 py-0.5 rounded-full border border-gold-accent/30">
                        <Sparkles className="h-3 w-3" />
                        <span>{project.metrics}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-sans font-bold text-text-primary group-hover:text-emerald-bright transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                    </h3>
                    <p className="text-xs font-mono text-emerald-bright mt-1">{project.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-mono text-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* Detailed Bullets */}
                  <ul className="space-y-1.5 pt-2 border-t border-forest-750 text-xs font-mono text-text-muted">
                    {project.detailedBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-accent shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tech Tags & External Links */}
                <div className="pt-4 border-t border-forest-750 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-forest-950 text-[11px] font-mono text-text-code border border-forest-750"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-750 text-text-primary text-xs font-mono border border-forest-700 transition-colors"
                      >
                        <Github className="h-3.5 w-3.5 text-emerald-bright" />
                        <span>Source Code</span>
                      </a>
                    )}

                    {project.paperUrl && (
                      <a
                        href={project.paperUrl}
                        download="IoT_Home_Automation_Paper.pdf"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-accent hover:bg-emerald-bright text-forest-950 text-xs font-mono font-bold transition-all shadow-emerald-glow"
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        <span>Download Paper (PDF)</span>
                      </a>
                    )}

                    {project.doiUrl && (
                      <a
                        href={project.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-850 hover:bg-forest-800 text-gold-accent text-xs font-mono border border-forest-750 transition-colors"
                        title="View Published Journal DOI"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>Journal DOI</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-accent hover:bg-emerald-bright text-forest-950 text-xs font-mono font-bold transition-all shadow-emerald-glow"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
