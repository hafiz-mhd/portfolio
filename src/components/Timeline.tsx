"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

interface TimelineItem {
  institution: string;
  degree: string;
  period: string;
  icon: React.ReactNode;
  details: string;
  techTags: string[];
}

const educationData: TimelineItem[] = [
  {
    institution: "Saintgits College of Engineering",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "2022 – 2026",
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    details: "Acquiring core competencies in Software Engineering, Machine Learning architectures, Cybersecurity guidelines, and Full-Stack development paradigms. Engaging in agile projects and leadership initiatives.",
    techTags: ["Data Structures", "AI & ML", "Cybersecurity", "Object-Oriented Design"],
  },
  {
    institution: "Durga Higher Secondary School",
    degree: "Science Stream",
    period: "2020 – 2022",
    icon: <BookOpen className="w-5 h-5 text-purple-400" />,
    details: "Completed advanced higher secondary curriculum with a primary concentration in Mathematics, Physics, Chemistry, and Computer Science.",
    techTags: ["Mathematics", "Physics", "C++ Programming"],
  },
  {
    institution: "Kendriya Vidyalaya No.1 CPCRI",
    degree: "Secondary Education",
    period: "2019 – 2020",
    icon: <Award className="w-5 h-5 text-emerald-400" />,
    details: "Actained robust foundational schooling under Central Board of Secondary Education (CBSE), focusing on Science, Logic, and Mathematics.",
    techTags: ["Logic Foundation", "Secondary Science", "Mathematics"],
  },
];

export default function Timeline() {
  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12">
      {/* Background connection laser trail */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800/80 -translate-x-1/2" />

      {/* Glowing active progress line with Framer Motion triggers */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 -translate-x-1/2 shadow-[0_0_15px_rgba(34,211,238,0.7)]"
      />

      <div className="space-y-16">
        {educationData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row relative items-start md:items-center ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Animated Timeline Node with Pulse glows */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-800 -translate-x-1/2 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(2,2,10,0.8)]">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 220 }}
                  className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse"
                />
              </div>

              {/* Spacing alignment for layout grid balance */}
              <div className="w-full md:w-1/2" />

              {/* Holographic timeline text card */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                  isEven ? "md:pr-12 md:text-right" : "md:pl-12 text-left"
                }`}
              >
                <div className="p-6 md:p-8 rounded-3xl bg-slate-950/50 border border-slate-900 hover:border-purple-500/35 hover:shadow-[0_0_35px_rgba(168,85,247,0.08)] transition-all duration-500 relative group overflow-hidden backdrop-blur-md">
                  {/* Hexagon tech overlay grids */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />

                  {/* Header info */}
                  <div className={`flex items-center gap-3 mb-4 ${isEven ? "md:justify-end" : "justify-start"}`}>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-purple-500/20 transition-colors shadow-inner">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/30 border border-cyan-900/40 px-3 py-1 rounded-full">
                      {item.period}
                    </span>
                  </div>

                  {/* Degree name */}
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-purple-300 transition-colors duration-300">
                    {item.degree}
                  </h3>

                  {/* Institution name */}
                  <h4 className="text-sm font-mono text-slate-400 font-semibold mt-1 mb-4">
                    {item.institution}
                  </h4>

                  {/* Details paragraph */}
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                    {item.details}
                  </p>

                  {/* Sub-tags list */}
                  <div className={`flex flex-wrap gap-1.5 ${isEven ? "md:justify-end" : "justify-start"}`}>
                    {item.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[10px] font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
