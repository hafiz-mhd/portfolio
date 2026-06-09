"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Signature() {
  // Detailed SVG path representing a stylized cursive signature "Hafiz Muhammed"
  const signaturePath = 
    "M 10,45 " +
    "C 15,25, 20,5, 25,20 " +   // 'H' loop
    "C 23,35, 12,55, 30,55 " +   // 'H' cross & base
    "Q 40,40, 45,35 " +         // connection to 'a'
    "C 40,45, 42,52, 48,50 " +   // 'a' curve
    "Q 52,42, 53,52 " +         // 'a' stem
    "C 55,42, 58,35, 59,38 " +   // 'f' top loop
    "C 60,42, 53,68, 56,68 " +   // 'f' bottom loop
    "C 58,68, 63,50, 65,48 " +   // 'f' crossing
    "C 66,48, 68,52, 69,50 " +   // 'i'
    "Q 72,42, 73,50 " +         // 'z' start
    "C 74,54, 70,62, 78,58 " +   // 'z' loop and tail
    "M 68,36 A 1,1 0 1,1 68,37" + // 'i' dot
    " " +
    "M 88,48 " +
    "C 90,38, 93,28, 95,32 " +   // 'M' peak 1
    "C 97,36, 98,52, 100,48 " +  // 'M' dip
    "C 102,44, 105,32, 107,35 " + // 'M' peak 2
    "C 109,38, 110,50, 112,50 " + // 'M' end
    "C 114,44, 116,42, 118,50 " + // 'u'
    "C 120,44, 122,46, 125,48 " + // 'h'
    "C 127,42, 129,48, 131,50 " + // 'a'
    "C 133,45, 136,44, 138,50 " + // 'm'
    "C 140,44, 142,44, 144,50 " + // 'm'
    "C 146,45, 148,46, 150,48 " + // 'e'
    "C 152,42, 154,32, 155,52 " + // 'd'
    "Q 120,65, 185,55";          // elegant underline swoop

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2.2,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 select-none">
      <svg
        width="220"
        height="85"
        viewBox="0 0 200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-20"
      >
        {/* Glow backing path */}
        <motion.path
          d={signaturePath}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          stroke="#8b5cf6"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50 blur-[3px]"
        />

        {/* Sharp front path */}
        <motion.path
          d={signaturePath}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          stroke="url(#signatureGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" /> {/* Purple */}
            <stop offset="50%" stopColor="#f43f5e" /> {/* Rose */}
            <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
