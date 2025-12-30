"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  glowColor?: string;
}

export default function Card({ children, className = "", hoverable = true, onClick, glowColor = "primary" }: CardProps) {
  const glowColors: Record<string, string> = {
    primary: "group-hover:shadow-primary/20",
    secondary: "group-hover:shadow-secondary/20",
    blue: "group-hover:shadow-blue-500/20",
    purple: "group-hover:shadow-purple-500/20",
    green: "group-hover:shadow-green-500/20",
  };

  return (
    <motion.div
      whileHover={hoverable ? { 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0_0_0/0.08)] hover:shadow-[0_20px_50px_rgb(0_0_0/0.15)] ${glowColors[glowColor] || glowColors.primary} transition-all duration-300 ${className}`}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-secondary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-primary/10 transition-all duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
}
