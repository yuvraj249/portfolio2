"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const words = title.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 border border-emerald-accent/30 text-emerald-accent text-xs font-mono mb-4 shadow-emerald-glow"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright animate-pulse" />
        <span>{badge}</span>
      </motion.div>

      {/* Main Title Reveal */}
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-text-primary tracking-tight"
      >
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={wordVariants}
            className="inline-block mr-3"
          >
            {word === "Live" || word === "CodeMind" || word === "Experience" || word === "Skills" ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-bright to-gold-accent">
                {word}
              </span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-text-secondary font-mono text-sm max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
