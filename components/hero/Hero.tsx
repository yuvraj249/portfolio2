"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  RotateCcw,
  Copy,
  Check,
  Code2,
  X,
  Minimize2,
  Maximize2,
  GripHorizontal,
  FileDown,
} from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import AnimatedCounter from "../ui/AnimatedCounter";

const CODE_SNIPPETS = [
  {
    id: "rag",
    title: "CodeMind AI (RAG Pipeline)",
    language: "Python",
    code: `class CodeMindRAG:
    """FastAPI RAG Pipeline for Repository Codebases"""
    def __init__(self, repo_url: str):
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        self.vector_store = ChromaDBStore(repo_url, self.embeddings)

    async def answer_code_query(self, query: str) -> QueryResult:
        context_chunks = await self.vector_store.similarity_search(query, k=5)
        chain = load_qa_chain(llm=ChatOpenAI(model="gpt-4o-mini"))
        return await chain.arun(input_documents=context_chunks, question=query)`,
    testResult: "✓ RAG pipeline ingested 142 chunks. Similarity score: 0.942.",
  },
  {
    id: "playwright",
    title: "Playwright E2E Suite",
    language: "TypeScript",
    code: `test.describe("EXXAT Web App A11y & E2E Suite", () => {
  test("verify keyboard navigation & a11y compliance", async ({ page }) => {
    await page.goto("/dashboard/erp");
    const accessibilityScan = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScan.violations).toEqual([]);
    
    await page.getByTestId("data-cy-inventory-table").click();
    await expect(page.locator("table.inventory-list")).toBeVisible();
  });
});`,
    testResult: "✓ 12 E2E test cases passed in 1.42s (0 a11y violations found).",
  },
  {
    id: "golang",
    title: "Product Inventory API",
    language: "Go",
    code: `package main

func HandleInventoryCRUD(c *gin.Context) {
    userClaims := c.MustGet("user").(*JWTClaims)
    if !userClaims.HasRole(RBAC_ADMIN) {
        c.JSON(403, gin.H{"error": "Unauthorized permission level"})
        return
    }
    
    product := ProductService.CreateProduct(c.Request.Context())
    c.JSON(201, gin.H{"status": "success", "product": product})
}`,
    testResult: "✓ HTTP 201 Created — JWT Auth verified in 8ms.",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalLogsEndRef = useRef<HTMLDivElement>(null);

  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [showTestPass, setShowTestPass] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Yuvraj Bisht OS Terminal v2.4",
    "Type 'help' to list available commands.",
  ]);

  const [heroLeetCode, setHeroLeetCode] = useState(117);
  const [heroGitHub, setHeroGitHub]     = useState(408);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalSolved) setHeroLeetCode(data.totalSolved);
      })
      .catch(() => {});

    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalContributions) setHeroGitHub(data.totalContributions);
      })
      .catch(() => {});
  }, []);

  // Scroll-scrubbed hero effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.96]);

  const currentSnippet = CODE_SNIPPETS[activeSnippetIdx];

  // Self-typing loop
  useEffect(() => {
    setTypedText("");
    setIsTyping(true);
    setShowTestPass(false);

    let charIdx = 0;
    const fullText = currentSnippet.code;

    const timer = setInterval(() => {
      if (charIdx < fullText.length) {
        setTypedText(fullText.slice(0, charIdx + 4));
        charIdx += 4;
      } else {
        setTypedText(fullText);
        setIsTyping(false);
        clearInterval(timer);
        setTimeout(() => {
          setIsRunningTest(true);
          setTimeout(() => {
            setIsRunningTest(false);
            setShowTestPass(true);
          }, 800);
        }, 300);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [activeSnippetIdx]);

  // Auto-focus CLI terminal input when opened or un-minimized
  useEffect(() => {
    if (terminalOpen && !terminalMinimized) {
      setTimeout(() => {
        terminalInputRef.current?.focus();
      }, 100);
    }
  }, [terminalOpen, terminalMinimized]);

  // Scroll terminal logs to bottom on new log
  useEffect(() => {
    if (terminalLogsEndRef.current) {
      terminalLogsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  // Global ESC key listener to close terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && terminalOpen) {
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminalOpen]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput("");
    if (!cmd) return;

    let response = "";
    if (cmd === "clear") {
      setTerminalLogs([]);
      return;
    } else if (cmd === "whoami") {
      response = "Yuvraj Bisht — B.Tech CSE Developer (QA/Automation, Golang, FastAPI, React, AI/RAG)";
    } else if (cmd === "skills") {
      response = "Playwright, Cypress, Golang, Python, FastAPI, ReactJS, LangChain, OpenAI, SQL, ChromaDB";
    } else if (cmd === "projects") {
      response = "1. CodeMind (AI Codebase Assistant: https://frontend-vert-chi-72.vercel.app) | 2. Product Catalogue API (Go/Gin) | 3. IoT Home Automation";
    } else if (cmd === "stats") {
      response = `GitHub: ${heroGitHub} contributions | LeetCode: ${heroLeetCode} solved`;
    } else if (cmd === "help") {
      response = "Available commands: whoami, skills, projects, stats, clear";
    } else {
      response = `Command '${cmd}' not recognized. Type 'help' for options.`;
    }

    setTerminalLogs((prev) => [...prev, `$ ${cmd}`, response]);
  };

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-forest-900"
    >
      {/* Background Subtle Line Grid & Radial Ambient Light */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14292115_1px,transparent_1px),linear-gradient(to_bottom,#14292115_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Scroll-scrubbed main hero content */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Personal Intro */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-850 border border-emerald-accent/30 text-emerald-bright text-xs font-mono shadow-emerald-glow"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-accent" />
              <span>Full-Stack &bull; QA Automation &bull; Applied AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-text-primary tracking-tight leading-[1.1]"
            >
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-bright via-emerald-accent to-gold-accent">
                Reliable Code & AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-secondary font-mono text-sm sm:text-base leading-relaxed max-w-xl"
            >
              Hi, I'm <strong className="text-text-primary font-sans font-semibold">Yuvraj Bisht</strong> (B.Tech CSE). 
              I design resilient <span className="text-emerald-bright">QA automation test suites</span> (Playwright, Cypress), 
              ship robust <span className="text-emerald-bright">backends</span> (Golang, FastAPI), and architect 
              intelligent <span className="text-gold-accent">RAG AI pipelines</span>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <MagneticButton href="#projects">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-accent to-emerald-muted text-forest-950 font-mono font-bold text-sm shadow-emerald-glow hover:brightness-110 transition-all">
                  <span>Explore Projects</span>
                  <Code2 className="h-4 w-4" />
                </button>
              </MagneticButton>

              <MagneticButton href="/resume.pdf" download>
                <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-accent/20 hover:bg-emerald-accent/30 border border-emerald-accent/50 text-emerald-bright font-mono font-bold text-sm transition-all shadow-emerald-glow">
                  <FileDown className="h-4 w-4" />
                  <span>Resume</span>
                </button>
              </MagneticButton>

              <MagneticButton onClick={() => setTerminalOpen(!terminalOpen)}>
                <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-forest-850 hover:bg-forest-800 border border-forest-750 text-text-primary font-mono text-sm transition-all shadow-md">
                  <TerminalIcon className="h-4 w-4 text-emerald-bright" />
                  <span>{terminalOpen ? "Hide CLI" : "Open CLI ($)"}</span>
                </button>
              </MagneticButton>
            </motion.div>

            {/* Metric Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-forest-750/60 font-mono text-xs"
            >
              <div>
                <div className="text-emerald-bright font-bold text-lg">
                  <AnimatedCounter value={heroLeetCode} />
                </div>
                <div className="text-text-muted text-[11px]">LeetCode Solves</div>
              </div>
              <div>
                <div className="text-gold-accent font-bold text-lg">
                  <AnimatedCounter value={heroGitHub} />
                </div>
                <div className="text-text-muted text-[11px]">GitHub Commits</div>
              </div>
              <div>
                <div className="text-text-primary font-bold text-lg">100%</div>
                <div className="text-text-muted text-[11px]">E2E Coverage</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Self-Typing Code & Interactive Test Execution Runner */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl bg-forest-950 border border-forest-750 shadow-2xl overflow-hidden"
            >
              {/* IDE Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-forest-850 border-b border-forest-750">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-text-muted">
                    yuvraj-workspace &mdash; {currentSnippet.language.toLowerCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded hover:bg-forest-750 text-text-muted hover:text-text-primary transition-colors"
                    title="Copy Snippet"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-bright" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Snippet Switcher Tabs */}
              <div className="flex items-center border-b border-forest-750/70 bg-forest-900/90 overflow-x-auto">
                {CODE_SNIPPETS.map((snippet, idx) => (
                  <button
                    key={snippet.id}
                    onClick={() => setActiveSnippetIdx(idx)}
                    className={`px-4 py-2 text-xs font-mono border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      activeSnippetIdx === idx
                        ? "border-emerald-bright text-emerald-bright bg-forest-850/80 font-bold"
                        : "border-transparent text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <Layers className="h-3 w-3" />
                    <span>{snippet.title}</span>
                  </button>
                ))}
              </div>

              {/* Self-Typing Code Editor Body */}
              <div className="p-5 font-mono text-xs sm:text-sm text-text-code leading-relaxed overflow-x-auto min-h-[220px] bg-forest-950/95 relative">
                <pre className="whitespace-pre-wrap">
                  <code>{typedText}</code>
                  {isTyping && <span className="inline-block w-2 h-4 bg-emerald-bright animate-pulse ml-0.5" />}
                </pre>
              </div>

              {/* Automated Execution Status Bar */}
              <div className="px-4 py-3 bg-forest-850 border-t border-forest-750 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  {isRunningTest ? (
                    <div className="flex items-center gap-2 text-gold-accent">
                      <Zap className="h-4 w-4 animate-spin" />
                      <span>Executing suite...</span>
                    </div>
                  ) : showTestPass ? (
                    <div className="flex items-center gap-2 text-emerald-bright">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{currentSnippet.testResult}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-text-muted">
                      <Cpu className="h-4 w-4" />
                      <span>Ready for runner trigger</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setTypedText("");
                    setIsTyping(true);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-forest-800 hover:bg-forest-750 text-text-secondary text-[11px] transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Re-run</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Movable & Draggable Global CLI Terminal Window */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.05}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={() => terminalInputRef.current?.focus()}
            className="fixed bottom-6 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[500px] rounded-2xl bg-forest-950/95 backdrop-blur-xl border border-emerald-accent/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.25)] overflow-hidden cursor-default"
          >
            {/* Draggable Title Bar Handle */}
            <div className="flex items-center justify-between px-4 py-3 bg-forest-850/95 border-b border-forest-750 select-none cursor-grab active:cursor-grabbing group">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-bright font-bold">
                <GripHorizontal className="h-4 w-4 text-emerald-bright/50 group-hover:text-emerald-bright transition-colors" />
                <TerminalIcon className="h-4 w-4 text-emerald-bright animate-pulse" />
                <span>yuvraj@terminal:~$</span>
                <span className="text-[10px] text-text-muted font-normal hidden sm:inline">(drag to move)</span>
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setTerminalMinimized(!terminalMinimized)}
                  className="p-1 rounded hover:bg-forest-750 text-text-muted hover:text-text-primary transition-colors"
                  title={terminalMinimized ? "Expand" : "Minimize"}
                >
                  {terminalMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
                </button>

                <button
                  onClick={() => setTerminalOpen(false)}
                  className="p-1 rounded hover:bg-forest-750 text-text-muted hover:text-red-400 transition-colors"
                  title="Close Terminal (Esc)"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            {!terminalMinimized && (
              <div className="p-4 font-mono text-xs text-text-primary space-y-3">
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                  {terminalLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.startsWith("$")
                          ? "text-emerald-bright font-bold"
                          : log.startsWith("Yuvraj")
                          ? "text-gold-accent font-bold"
                          : "text-text-secondary leading-relaxed"
                      }
                    >
                      {log}
                    </div>
                  ))}
                  <div ref={terminalLogsEndRef} />
                </div>

                {/* Input Prompt */}
                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-forest-800">
                  <span className="text-emerald-accent font-bold text-sm">$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="whoami, skills, projects, stats, clear..."
                    className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-xs placeholder:text-text-muted focus:ring-0"
                    autoFocus
                  />
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
