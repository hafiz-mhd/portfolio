"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  ArrowRight,
  Layers,
  Cpu,
  Award,
  Users,
  Calendar,
  ChevronRight,
  Briefcase,
  Trophy,
  Shield,
  Search,
  ExternalLink
} from "lucide-react";

// Components imports
import ThreeBackground from "../components/ThreeBackground";
import HeroAvatar from "../components/HeroAvatar";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import Timeline from "../components/Timeline";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";
import Signature from "../components/Signature";
import CursorGlow from "../components/CursorGlow";
import Typewriter from "../components/Typewriter";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen bg-[#020208] text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-cyan-300">
          
          {/* WebGL 4D Background Experience */}
          <ThreeBackground />

          {/* Micro-Interactive Custom Cursor Glow */}
          <CursorGlow />

          {/* Apple & Tesla-inspired Sticky Navbar */}
          <Navbar />

          {/* 1. HERO SECTION */}
          <section
            id="home"
            className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4 md:px-8"
          >
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
              
              {/* Hero Information Details (7 Columns) */}
              <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-slate-900 text-[10px] md:text-xs font-mono text-cyan-400 uppercase tracking-widest"
                >
                  <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "4s" }} />
                  <span>Cognitive Neural Architecture // V5.4</span>
                </motion.div>

                <div className="space-y-3">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight text-slate-100 leading-none"
                  >
                    Ar Hafiz Muhammed
                  </motion.h1>

                  {/* Subheadline Typing Tagline */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-lg font-mono text-slate-300 font-semibold flex flex-wrap items-center gap-1.5 min-h-[28px]"
                  >
                    <span>I am specializing in</span>
                    <Typewriter
                      words={[
                        "Building Intelligent Digital Experiences",
                        "Frontend Developer",
                        "AI & Machine Learning Enthusiast",
                        "Cybersecurity Explorer",
                        "Problem Solver",
                        "Technology Innovator",
                      ]}
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-xs font-mono text-slate-500 uppercase tracking-wider block"
                  >
                    Computer Science &amp; Engineering Graduate
                  </motion.p>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="max-w-xl text-sm md:text-base text-slate-400 leading-relaxed font-sans"
                >
                  Building world-class, intelligent digital experiences that bridge frontend aesthetics, AI-driven architectures, and security compliance.
                </motion.p>

                {/* Hero Call-To-Action Channels */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <a
                    href="#about"
                    className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:border-purple-500/20 shadow-inner cursor-pointer"
                  >
                    Explore My Journey
                  </a>
                  <a
                    href="#projects"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] cursor-pointer"
                  >
                    View Projects <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="px-6 py-3.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer"
                  >
                    Download Resume <Download className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-3.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                  >
                    Contact Me
                  </a>
                </motion.div>
              </div>

              {/* 3D Holographic Avatar Reconstruction Canvas (5 Columns) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                  className="w-full max-w-[420px] lg:max-w-none"
                >
                  <HeroAvatar />
                </motion.div>
              </div>

            </div>
          </section>

          {/* 2. ABOUT ME STORYTELLING SECTION */}
          <section id="about" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60">
            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">// self_compiled_biography</span>
                <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-4" />
              </motion.div>

              {/* Storytelling Text Reveal with Framer Motion */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="p-8 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-xl relative overflow-hidden"
              >
                {/* Visual side highlights */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-cyan-400 to-purple-600" />
                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-sans text-center md:text-left">
                  "Computer Science and Engineering graduate with hands-on experience in Frontend Development, Cybersecurity, Artificial Intelligence, and Machine Learning.
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-sans text-center md:text-left mt-4">
                  Skilled in Python, Linux, SQL, Angular, and modern web technologies. Passionate about building scalable applications, solving complex problems, and creating impactful digital experiences."
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
              >
                {[
                  {
                    icon: <Layers className="w-6 h-6 text-purple-400" />,
                    title: "B.Tech CSE Graduate",
                    text: "Equipped with strong software design theories, algorithms, and practical lifecycle experience.",
                  },
                  {
                    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
                    title: "AI & ML Architectures",
                    text: "Trained in computer vision tools like YOLOv8, predictive classification models, and neural metrics.",
                  },
                  {
                    icon: <Users className="w-6 h-6 text-emerald-400" />,
                    title: "Leadership Focus",
                    text: "Proven record managing sponsorships, directing college tech fests, and captains college teams.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-md hover:border-slate-800 hover:bg-slate-950/60 transition-all duration-300 shadow-sm"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 3. EXPERIENCE SECTION */}
          <section id="experience" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60 bg-slate-950/10">
            <div className="max-w-5xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// professional_logs</span>
                <h2 className="text-3xl md:text-4xl font-bold">Professional Experience</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                
                {/* 1. NeST Digital Internship Card */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="p-6 md:p-8 rounded-3xl bg-slate-950/50 border border-slate-900 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full blur-xl" />
                  
                  {/* Hologram card strip detail */}
                  <div className="absolute top-4 right-4 text-[8px] font-mono text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-wider bg-purple-950/10">
                    Active Intern Node
                  </div>

                  <div className="flex gap-4 items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Briefcase className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block font-bold">2024 - PRESENT</span>
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-300 transition-colors">Frontend Development Intern</h3>
                      <h4 className="text-sm font-mono text-slate-400 mt-0.5 font-semibold">NeST Digital</h4>
                    </div>
                  </div>

                  <ul className="space-y-3 font-sans text-sm text-slate-400 mb-6">
                    {[
                      "Engineered complex and responsive web architectures utilizing Angular",
                      "Leveraged TypeScript type safety layers for maintainable clean code layouts",
                      "Designed mobile-first fluid user interfaces matching corporate design frameworks",
                      "Integrated RESTful API communication pathways dynamically for remote database queries",
                      "Collaborated actively in Scrum sprints, agile backlogs, and code review feedback systems"
                    ].map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Core skills tags for this specific role */}
                  <div className="flex flex-wrap gap-1.5 border-t border-slate-900/80 pt-4">
                    {["Angular Development", "TypeScript", "Responsive UI Design", "REST API Integration", "Agile Development"].map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-purple-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* 2. KELTRON Internship Card */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="p-6 md:p-8 rounded-3xl bg-slate-950/50 border border-slate-900 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full blur-xl" />
                  
                  {/* Hologram card strip detail */}
                  <div className="absolute top-4 right-4 text-[8px] font-mono text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wider bg-cyan-950/10">
                    Archived Intern Node
                  </div>

                  <div className="flex gap-4 items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">2023</span>
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">AI &amp; ML Intern</h3>
                      <h4 className="text-sm font-mono text-slate-400 mt-0.5 font-semibold">KELTRON</h4>
                    </div>
                  </div>

                  <ul className="space-y-3 font-sans text-sm text-slate-400 mb-6">
                    {[
                      "Constructed data pre-processing and parsing algorithms for machine learning targets",
                      "Audited host endpoints, networks, and communication protocols against vulnerability maps",
                      "Automated server logging tasks and data scraping runs via python script executors",
                      "Built clear visualization panels and charts to represent dynamic analytics data",
                      "Evaluated host defenses using vulnerability scanners and security auditing toolsets"
                    ].map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Core skills tags for this specific role */}
                  <div className="flex flex-wrap gap-1.5 border-t border-slate-900/80 pt-4">
                    {["Machine Learning", "Cybersecurity", "Python Automation", "Data Visualization", "Security Tools"].map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* 4. TECHNICAL SKILLS GALAXY */}
          <section id="skills" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60 bg-slate-950/20">
            <div className="max-w-5xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// neural_attributes</span>
                <h2 className="text-3xl md:text-4xl font-bold">Skills Galaxy</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4" />
              </motion.div>

              <Skills />
            </div>
          </section>

          {/* 5. FEATURED PROJECTS SHOWCASE */}
          <section id="projects" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60">
            <div className="max-w-5xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">// code_deployments</span>
                <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-4" />
              </motion.div>

              <Projects />
            </div>
          </section>

          {/* 6. EDUCATION TIMELINE */}
          <section id="education" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60 bg-slate-950/20">
            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">// learning_milestones</span>
                <h2 className="text-3xl md:text-4xl font-bold">Education Timeline</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-4" />
              </motion.div>

              <Timeline />
            </div>
          </section>

          {/* 7. CERTIFICATIONS */}
          <section id="certifications" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60">
            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// verified_credentials</span>
                <h2 className="text-3xl md:text-4xl font-bold">Certifications</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {[
                  {
                    title: "Fundamentals of Cybersecurity",
                    issuer: "NIT Calicut",
                    code: "NIT-SEC-89240",
                  },
                  {
                    title: "Python Programming Course",
                    issuer: "Add-on Course",
                    code: "PY-ADDON-6520",
                  },
                  {
                    title: "Machine Learning & Artificial Intelligence Course",
                    issuer: "Specialized Training",
                    code: "MLAI-SPEC-1104",
                  },
                ].map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/35 transition-all duration-300 flex flex-col justify-between h-44"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full" />
                    <Award className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>
                      <h4 className="text-xs font-mono text-slate-400 font-semibold mb-2">{cert.issuer}</h4>
                    </div>
                    <div className="text-[9px] font-mono text-slate-600 group-hover:text-slate-500 transition-colors border-t border-slate-900 pt-2">
                      ID: {cert.code} // VERIFIED
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. LEADERSHIP & ACHIEVEMENTS */}
          <section id="leadership" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60 bg-slate-950/20">
            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">// command_operations</span>
                <h2 className="text-3xl md:text-4xl font-bold">Leadership &amp; Achievements</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-4" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                {[
                  {
                    title: "Event Head – Nakshatra 2025",
                    icon: <Calendar className="w-6 h-6 text-purple-400 animate-pulse" />,
                    details: [
                      "Led 15+ team members in event execution and planning logistics",
                      "Managed sponsors and coordinate vendor scheduling structures",
                      "Facilitated and executed fest timelines autonomously",
                    ],
                    badgeText: "Fest Director Node",
                    badgeColor: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Captain – College Football Team",
                    icon: <Trophy className="w-6 h-6 text-cyan-400" />,
                    details: [
                      "Represented college in inter-college tournaments as team leader",
                      "Orchestrated training routines, defensive drills, and game strategies",
                      "Motivated squad members in high-pressure competition environments",
                    ],
                    badgeText: "Squad Commander Node",
                    badgeColor: "from-cyan-400 to-blue-600"
                  },
                ].map((role, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="p-6 md:p-8 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-xl hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                  >
                    <div>
                      {/* Interactive Badge indicator */}
                      <div className={`inline-block text-[8px] font-mono font-bold uppercase tracking-widest text-white px-2 py-0.5 rounded bg-gradient-to-r ${role.badgeColor} mb-4 shadow-sm`}>
                        {role.badgeText}
                      </div>

                      <div className="flex gap-4 items-center mb-5">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                          {role.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-100">
                          {role.title}
                        </h3>
                      </div>
                      <ul className="space-y-3 font-sans text-xs md:text-sm text-slate-400">
                        {role.details.map((detail, key) => (
                          <li key={key} className="flex gap-2 items-start">
                            <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. CONTACT SECTION */}
          <section id="contact" className="py-24 relative px-4 md:px-8 border-t border-slate-900/60">
            <div className="max-w-5xl mx-auto space-y-12">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-2"
              >
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// socket_channels</span>
                <h2 className="text-3xl md:text-4xl font-bold">Secure Contact</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4" />
              </motion.div>

              <ContactForm />
            </div>
          </section>

          {/* 10. LUXURY PREMIUM FOOTER */}
          <footer className="py-12 border-t border-slate-900 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 text-center space-y-4 relative z-10">
              {/* Glowing animated signature */}
              <Signature />

              <p className="text-slate-500 font-mono text-[9px] md:text-xs uppercase tracking-widest font-bold">
                Designed &amp; Developed by Ar Hafiz Muhammed
              </p>
              <p className="text-slate-600 text-[8px] font-mono">
                &copy; {new Date().getFullYear()} // ALL NEURAL INTERFACES STABLE // SYSTEMS OPERATIONAL
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
