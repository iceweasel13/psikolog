"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

export interface MotionItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export function MotionItem({
  children,
  delay = 0,
  duration = 0.5,
  y = 20,
  className = "",
  ...props
}: MotionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
