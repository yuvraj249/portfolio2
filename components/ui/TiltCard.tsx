"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "emerald" | "gold";
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "emerald",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Limit tilt angle to max +/- 8 deg
    setRotateX((-mouseY / (rect.height / 2)) * 8);
    setRotateY((mouseX / (rect.width / 2)) * 8);

    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const glowBg =
    glowColor === "emerald"
      ? `radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(16, 185, 129, 0.12), transparent 80%)`
      : `radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(245, 158, 11, 0.14), transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden rounded-xl border border-forest-750 bg-forest-850 p-6 transition-colors duration-300 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: glowBg,
        }}
      />

      {/* Content wrapper with subtle 3D translation */}
      <div className="relative z-20" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
