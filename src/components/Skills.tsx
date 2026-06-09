"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  category: string;
  color: string;
  glowClr: string;
}

const skillsData: SkillItem[] = [
  // Programming
  { name: "Python", category: "Programming", color: "from-purple-500 to-indigo-500", glowClr: "rgba(168, 85, 247, 0.6)" },
  { name: "Java", category: "Programming", color: "from-purple-500 to-indigo-500", glowClr: "rgba(168, 85, 247, 0.6)" },
  { name: "C", category: "Programming", color: "from-purple-500 to-indigo-500", glowClr: "rgba(168, 85, 247, 0.6)" },
  { name: "SQL", category: "Programming", color: "from-purple-500 to-indigo-500", glowClr: "rgba(168, 85, 247, 0.6)" },
  
  // Frontend
  { name: "Angular", category: "Frontend", color: "from-cyan-400 to-blue-500", glowClr: "rgba(34, 211, 238, 0.6)" },
  { name: "HTML5", category: "Frontend", color: "from-cyan-400 to-blue-500", glowClr: "rgba(34, 211, 238, 0.6)" },
  { name: "CSS3", category: "Frontend", color: "from-cyan-400 to-blue-500", glowClr: "rgba(34, 211, 238, 0.6)" },
  { name: "REST APIs", category: "Frontend", color: "from-cyan-400 to-blue-500", glowClr: "rgba(34, 211, 238, 0.6)" },
  
  // Tools
  { name: "Git", category: "Tools", color: "from-pink-500 to-rose-500", glowClr: "rgba(236, 72, 153, 0.6)" },
  { name: "Linux", category: "Tools", color: "from-pink-500 to-rose-500", glowClr: "rgba(236, 72, 153, 0.6)" },
  { name: "VS Code", category: "Tools", color: "from-pink-500 to-rose-500", glowClr: "rgba(236, 72, 153, 0.6)" },
  { name: "Selenium", category: "Tools", color: "from-pink-500 to-rose-500", glowClr: "rgba(236, 72, 153, 0.6)" },
  
  // Domains
  { name: "Artificial Intelligence", category: "Domains", color: "from-emerald-400 to-teal-500", glowClr: "rgba(16, 185, 129, 0.6)" },
  { name: "Machine Learning", category: "Domains", color: "from-emerald-400 to-teal-500", glowClr: "rgba(16, 185, 129, 0.6)" },
  { name: "Cybersecurity", category: "Domains", color: "from-emerald-400 to-teal-500", glowClr: "rgba(16, 185, 129, 0.6)" },
  { name: "Frontend Development", category: "Domains", color: "from-emerald-400 to-teal-500", glowClr: "rgba(16, 185, 129, 0.6)" },
];

interface Point3D {
  x: number;
  y: number;
  z: number;
  skill: SkillItem;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [points, setPoints] = useState<Point3D[]>([]);
  const [rotation, setRotation] = useState({ x: 0.1, y: 0.15 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Initialize sphere coordinates using Fibonacci mapping
  useEffect(() => {
    setIsMounted(true);

    const filtered = activeCategory === "All" 
      ? skillsData 
      : skillsData.filter(s => s.category === activeCategory);

    const N = filtered.length;
    const tempPoints: Point3D[] = [];

    for (let i = 0; i < N; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;

      tempPoints.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        skill: filtered[i],
      });
    }

    setPoints(tempPoints);
  }, [activeCategory]);

  // Handle continuous rotation
  useEffect(() => {
    if (!isMounted || points.length === 0) return;

    let frameId: number;

    const updateRotation = () => {
      // Rotate coordinates slightly if not dragging or hovering
      if (!isDragging.current && hoveredIndex === null) {
        setRotation((prev) => ({
          x: prev.x + 0.002,
          y: prev.y + 0.003,
        }));
      }
      frameId = requestAnimationFrame(updateRotation);
    };

    frameId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(frameId);
  }, [isMounted, points, hoveredIndex]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setRotation((prev) => ({
      x: prev.x - dy * 0.005,
      y: prev.y + dx * 0.005,
    }));

    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Perform 3D rotation math and projection
  const getProjectedPoints = () => {
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    const radius = 175; // Sphere size factor

    return points.map((p, idx) => {
      // 1. Rotate around Y-axis
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;

      // 2. Rotate around X-axis
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      // Perspective projection values
      const depth = 2.5; // virtual camera distance
      const scale = (depth + z2) / (depth + 0.5); // perspective scaling factor
      
      return {
        x: x1 * radius * scale,
        y: y2 * radius * scale,
        scale,
        opacity: 0.15 + 0.85 * ((z2 + 1) / 2),
        zIndex: Math.round((z2 + 1) * 100),
        skill: p.skill,
        idx,
      };
    });
  };

  if (!isMounted) return null;

  const projectedPoints = getProjectedPoints();
  const categories = ["All", "Programming", "Frontend", "Tools", "Domains"];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Category selector panel */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 z-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setHoveredIndex(null);
            }}
            className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider uppercase border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-transparent shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                : "bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-100 hover:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Sphere Interactive Space */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
      >
        {/* Soft center galaxy back-lighting */}
        <div className="absolute w-48 h-48 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute w-40 h-40 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

        {projectedPoints.map((item) => {
          const isHovered = hoveredIndex === item.idx;

          return (
            <motion.div
              key={item.idx}
              className="absolute pointer-events-auto"
              style={{
                transform: `translate3d(${item.x}px, ${item.y}px, 0px) scale(${item.scale})`,
                opacity: isHovered ? 1.0 : item.opacity,
                zIndex: item.zIndex,
              }}
              onMouseEnter={() => setHoveredIndex(item.idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`px-4 py-2 rounded-xl font-mono text-xs md:text-sm font-bold border transition-all duration-300 ${
                  isHovered
                    ? "bg-slate-900 text-white border-transparent scale-115"
                    : "bg-slate-950/40 text-slate-300 border-slate-900/60 backdrop-blur-sm"
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 0 25px ${item.skill.glowClr}, inset 0 0 10px ${item.skill.glowClr}`
                    : "none",
                  textShadow: isHovered
                    ? `0 0 8px ${item.skill.glowClr}`
                    : "none",
                }}
              >
                <span className={`bg-gradient-to-r ${item.skill.color} bg-clip-text text-transparent`}>
                  {item.skill.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Explanatory telemetry bar */}
      <div className="mt-4 text-center font-mono text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Drag to rotate skills galaxy // Hover to activate node glows</span>
      </div>
    </div>
  );
}
