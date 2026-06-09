"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const bootLogs = [
    "SYSTEM: AR_HAFIZ_MUHAMMED_PORTFOLIO BOOTING...",
    "SECURE_GATEWAY: ESTABLISHING SHIELDED VPN...",
    "DATABASE: CONNECTION TO SAINTGITS_COLLEGE_DB... [OK]",
    "AI_MODULE: INITIALIZING YOLOv8 WEIGHTS... [OK]",
    "CYBER_SEC: LOADING NIT_CALICUT_CYBERSECURITY_PROTOCOLS... [OK]",
    "FRONTEND: COMPILING ANGULAR & REACT ENGINE CORE... [OK]",
    "DATA: MOUNTING WORKSPACE DIRECTORIES (NEST_DIGITAL + KELTRON)... [OK]",
    "PORTFOLIO: OPTIMIZING THREE.js NEURAL CORE CANVAS... [OK]",
    "STATUS: BOOT COMPLETED. COMMENCING DATA STREAM...",
  ];

  useEffect(() => {
    // Increment progress bar
    const duration = 2400; // 2.4s total boot time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 600); // Allow fadeout animation
        }, 400);
      }
    }, intervalTime);

    // Stream logs based on progress
    const logInterval = setInterval(() => {
      setLogs((prev) => {
        if (prev.length < bootLogs.length) {
          return [...prev, bootLogs[prev.length]];
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 250);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03030f] text-slate-100 font-mono p-6"
        >
          {/* Scanning lines effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />

          <div className="w-full max-w-xl bg-slate-950/80 border border-purple-500/20 rounded-lg p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden">
            {/* Header circles */}
            <div className="flex gap-2 mb-4 border-b border-slate-800 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-slate-500 ml-auto">hafiz_os_v1.0.sh</span>
            </div>

            {/* Logs stream */}
            <div className="h-44 overflow-y-auto mb-6 text-left space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-900/30 text-xs md:text-sm">
              {logs.map((log, index) => {
                let color = "text-slate-300";
                if (log.includes("[OK]")) color = "text-emerald-400";
                if (log.includes("SYSTEM:")) color = "text-purple-400 font-bold";
                if (log.includes("STATUS:")) color = "text-cyan-400 font-bold";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={color}
                  >
                    <span className="text-slate-500 select-none mr-2">&gt;</span>
                    {log}
                  </motion.div>
                );
              })}
            </div>

            {/* Progress indicator */}
            <div className="flex justify-between items-center mb-2 text-xs md:text-sm font-semibold text-purple-300">
              <span>INITIALIZING SYSTEM CORE</span>
              <span>{progress}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400"
                style={{ width: `${progress}%` }}
                layoutId="progressBar"
              />
            </div>

            {/* Glowing grids */}
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
