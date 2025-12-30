"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export default function Counter({ end, suffix = "", prefix = "", duration = 2, label }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      spring.set(end);
    }
  }, [isInView, spring, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-1">
        {prefix && <span className="text-3xl md:text-4xl font-bold text-primary">{prefix}</span>}
        <motion.span className="text-3xl md:text-4xl font-bold text-primary">
          {display}
        </motion.span>
        {suffix && <span className="text-3xl md:text-4xl font-bold text-primary">{suffix}</span>}
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">{label}</p>
    </div>
  );
}
