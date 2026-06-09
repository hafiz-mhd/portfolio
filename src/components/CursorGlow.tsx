"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for exact cursor coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Unconditional hook declarations at the top level
  const bgGlowX = useSpring(useTransform(cursorX, (val) => val - 112), springConfig);
  const bgGlowY = useSpring(useTransform(cursorY, (val) => val - 112), springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach event listeners
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hover triggers for interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  // Conditional render of visual nodes is safe after all hooks are evaluated
  if (!isVisible) return null;

  return (
    <>
      {/* Glow Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/60 pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0)",
          borderColor: isHovered ? "#22d3ee" : "#a855f7", // cyan on hover, purple otherwise
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      {/* Distant soft background glow following cursor */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-30 mix-blend-screen hidden md:block"
        style={{
          x: bgGlowX,
          y: bgGlowY,
        }}
      />
    </>
  );
}
