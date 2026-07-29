"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield, Eye, TrendingDown, Target, Navigation, Mail, RefreshCw, Cpu, Activity, FileText, CheckCircle2, Sparkles, Layers, Users, Kanban, HelpCircle } from "lucide-react";

interface Project {
  title: string;
  tagline: string;
  technologies: string[];
  features: { icon: React.ReactNode; text: string }[];
  accentColor?: string;
  glowClr: string;
  metric?: string;
  simulation: React.ReactNode;
}

// 1. YOLOv8 PotAlert live simulator card content
function PotAlertSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [detected, setDetected] = useState(false);
  const [coords, setCoords] = useState({ lat: "12.4996° N", lng: "75.0079° E" });
  const [confidence, setConfidence] = useState(98.4);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setDetected(true);
      const randLat = (12.4996 + (Math.random() - 0.5) * 0.005).toFixed(4);
      const randLng = (75.0079 + (Math.random() - 0.5) * 0.005).toFixed(4);
      setCoords({ lat: `${randLat}° N`, lng: `${randLng}° E` });

      const randConf = +(95.0 + Math.random() * 4.9).toFixed(1);
      setConfidence(randConf);

      setTimeout(() => {
        setDetected(false);
      }, 2000);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden relative font-mono text-[10px] text-cyan-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_80%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-10" />

      <div className="absolute inset-0 flex flex-col justify-between p-3 z-10">
        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-1">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[9px] uppercase font-bold text-slate-300">YOLOv8_FEED: CAMERA_01</span>
          </div>
          <span className="text-[9px] text-slate-500">60 FPS // HD</span>
        </div>

        <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-[2px] h-full bg-slate-800/40 rotate-12 left-1/3" />
          <div className="absolute w-[2px] h-full bg-slate-800/40 -rotate-12 right-1/3" />

          {isPlaying && (
            <div className="absolute w-[3px] h-full flex flex-col gap-6 items-center top-0">
              <div className="w-1 h-8 bg-slate-600 animate-[panDown_1.2s_linear_infinite]" />
              <div className="w-1 h-8 bg-slate-600 animate-[panDown_1.2s_linear_infinite]" />
            </div>
          )}

          {detected ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1 }}
              className="absolute p-2 border-2 border-red-500 bg-red-950/20 rounded z-20 flex flex-col gap-1 w-32 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              <div className="flex justify-between items-center text-[8px] bg-red-500 text-white px-1 font-bold">
                <span>POTHOLE</span>
                <span>{confidence}%</span>
              </div>
              <span className="text-[7px] text-slate-300 font-bold">L: {coords.lat}</span>
              <span className="text-[7px] text-slate-300 font-bold">G: {coords.lng}</span>
            </motion.div>
          ) : (
            <span className="text-[9px] text-slate-500 animate-pulse uppercase">Scanning Road surface...</span>
          )}
        </div>

        <div className="border-t border-cyan-500/20 pt-1 flex justify-between text-[8px] text-slate-400">
          <span>LATENCY: 14.2ms</span>
          <span>CONFIDENCE: {confidence}%</span>
          <span>GEOMAP: PLOTTED</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes panDown {
          0% { transform: translateY(-40px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(80px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// 2. Automated Price Tracker Simulator card content
function PriceTrackerSimulator() {
  const [logs, setLogs] = useState<string[]>([
    "SYS_CRON: Price check queue initialized.",
    "SYS_CRON: Fetching product metadata [ID: Amazon_330A]...",
  ]);

  useEffect(() => {
    const events = [
      "SCRAPE: Fetching DOM from target product page...",
      "PARSE: Target price elements successfully identified.",
      "PRICE: Current price resolved as $149.00 (Base: $199.00)",
      "CRITERIA: Drop exceeds 20% alert threshold. [CRITICAL]",
      "SMTP: Connecting to SMTP server relay...",
      "EMAIL: Dispatching price alert to hafizmuhammedar123@gmail.com...",
      "COMPLETE: Logged event. Target efficiency metrics +20%.",
    ];

    let currentEvent = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLogs = [...prev, events[currentEvent]];
        if (nextLogs.length > 5) {
          nextLogs.shift();
        }
        return nextLogs;
      });
      currentEvent = (currentEvent + 1) % events.length;
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-900 p-3 overflow-hidden relative font-mono text-[9px] text-purple-400 flex flex-col justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_80%)]" />

      <div className="flex justify-between items-center border-b border-purple-500/20 pb-1 z-10 text-slate-400">
        <div className="flex items-center gap-1.5 font-bold">
          <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>CRON_MONITOR: SCRAPING_RELAY</span>
        </div>
        <span>CYCLE: 24H</span>
      </div>

      <div className="flex-1 flex flex-col gap-1 py-2 z-10">
        {logs.map((log, index) => {
          let clr = "text-slate-400";
          if (log.includes("[CRITICAL]") || log.includes("PRICE:")) clr = "text-yellow-400 font-bold";
          if (log.includes("EMAIL:") || log.includes("COMPLETE:")) clr = "text-emerald-400 font-bold";
          if (log.includes("SYS_CRON:")) clr = "text-purple-300";

          return (
            <div key={index} className={`flex items-start gap-1 ${clr}`}>
              <span>&gt;</span>
              <span className="leading-snug">{log}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-purple-500/20 pt-1 flex justify-between text-[8px] text-slate-500 z-10 font-bold">
        <span>ITEMS_TRACKED: 154</span>
        <span>SMTP: ONLINE</span>
        <span>EFFICIENCY: +20%</span>
      </div>
    </div>
  );
}

// 3. HireSense AI Live Simulator card content
function HireSenseSimulator() {
  const candidates = [
    { name: "ALEX_R_RESUME.PDF", score: 96, role: "Full-Stack AI Engineer", status: "MATCH_EXCELLENT", matchColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30" },
    { name: "SARAH_M_DEV.PDF", score: 91, role: "Backend FastAPI Architect", status: "MATCH_HIGH", matchColor: "text-cyan-400 border-cyan-500/40 bg-cyan-950/30" },
    { name: "DAVID_K_CV.PDF", score: 88, role: "React & ML Engineer", status: "INTERVIEW_READY", matchColor: "text-purple-400 border-purple-500/40 bg-purple-950/30" },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [parsingStep, setParsingStep] = useState(0);
  const steps = ["PARSING_PDF_TEXT", "SEMANTIC_JOB_MATCHING", "GENERATING_ATS_SCORE", "AI_INTERVIEW_QUESTIONS"];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setParsingStep((prev) => (prev + 1) % steps.length);
    }, 1800);

    const candidateInterval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % candidates.length);
    }, 7200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(candidateInterval);
    };
  }, [steps.length, candidates.length]);

  const activeCand = candidates[activeIdx];

  return (
    <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-900 p-3 overflow-hidden relative font-mono text-[9px] text-emerald-400 flex flex-col justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_80%)]" />

      {/* Simulator Header */}
      <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1 z-10 text-slate-400">
        <div className="flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>HIRESENSE_ATS: AI_PARSER</span>
        </div>
        <span className="text-[8px] bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 px-1.5 py-0.5 rounded uppercase">
          12 MODULES ACTIVE
        </span>
      </div>

      {/* Active Candidate Evaluation Card */}
      <div className="flex-1 flex flex-col justify-between py-2 z-10">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1 text-slate-200 font-bold text-[10px]">
              <FileText className="w-3 h-3 text-emerald-400" />
              <span>{activeCand.name}</span>
            </div>
            <span className="text-slate-500 text-[8px] block mt-0.5">TARGET: {activeCand.role}</span>
          </div>

          <div className={`px-2 py-0.5 rounded border text-[9px] font-bold ${activeCand.matchColor}`}>
            ATS: {activeCand.score}%
          </div>
        </div>

        {/* Live Parsing Progress Bar */}
        <div className="my-1 space-y-1">
          <div className="flex justify-between text-[8px] text-slate-400">
            <span>PIPELINE: {steps[parsingStep]}</span>
            <span className="text-emerald-400">{(parsingStep + 1) * 25}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500"
              animate={{ width: `${(parsingStep + 1) * 25}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Generated Interview Question Snippet */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded p-1.5 flex items-center gap-1.5 text-slate-300 text-[8px]">
          <HelpCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
          <span className="truncate italic">"Generated AI Q: Describe how you structured PostgreSQL schemas with FastAPI & React..."</span>
        </div>
      </div>

      {/* Footer analytics metrics */}
      <div className="border-t border-emerald-500/20 pt-1 flex justify-between text-[8px] text-slate-500 z-10 font-bold">
        <span>KANBAN: SYNCED</span>
        <span>POSTGRES: ONLINE</span>
        <span>ACCURACY: 96.4%</span>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 22, stiffness: 280 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 22, stiffness: 280 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full relative group cursor-pointer"
    >
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"
        style={{ backgroundColor: project.glowClr }}
      />

      <div className="h-full rounded-3xl bg-slate-950/50 border border-slate-900 p-6 md:p-8 backdrop-blur-2xl transition-all duration-300 group-hover:border-purple-500/20 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
                // System Deployment
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 group-hover:text-purple-300 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            {project.metric && (
              <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                {project.metric}
              </span>
            )}
          </div>

          <p className="text-slate-400 text-sm font-semibold mb-5 font-sans leading-relaxed">
            {project.tagline}
          </p>

          <div className="mb-6">
            {project.simulation}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800/60 text-[10px] font-mono text-slate-400 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <ul className="space-y-3 mb-6">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                <span className="mt-0.5 text-cyan-400">
                  {feat.icon}
                </span>
                <span className="font-sans leading-relaxed">{feat.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-900/80 pt-4 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
          <span>SOURCE_CHANNELS: MOUNTED</span>
          <span className="flex items-center gap-1 text-cyan-400 group-hover:underline font-bold">
            Interactive Dashboard &gt;
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projectsData: Project[] = [
    {
      title: "HireSense AI",
      tagline: "Intelligent Resume Screening & Recruitment Platform",
      technologies: ["React", "FastAPI", "PostgreSQL", "Python", "OpenAI / LLM", "ATS Engine"],
      glowClr: "rgba(16, 185, 129, 0.4)",
      metric: "12 Integrated Modules",
      features: [
        { icon: <Sparkles className="w-4 h-4 text-emerald-400" />, text: "AI Resume parsing, semantic job matching & dynamic ATS score generation" },
        { icon: <HelpCircle className="w-4 h-4 text-cyan-400" />, text: "AI-powered automated candidate interview question generation" },
        { icon: <Kanban className="w-4 h-4 text-purple-400" />, text: "Full recruiter dashboard, candidate management & Kanban application pipeline" },
        { icon: <Layers className="w-4 h-4 text-emerald-400" />, text: "12 complete modules including Dashboard, Jobs, Candidates, Interview Scheduler, Notifications, and Analytics" },
      ],
      simulation: <HireSenseSimulator />,
    },
    {
      title: "PotAlert",
      tagline: "AI-Based Smart Pothole Detection System",
      technologies: ["YOLOv8", "OpenCV", "Firebase", "React", "Google Maps API"],
      glowClr: "rgba(6, 182, 212, 0.4)",
      metric: "98.4% AI Accuracy",
      features: [
        { icon: <Eye className="w-4 h-4" />, text: "Real-time pothole detection using computer vision" },
        { icon: <Navigation className="w-4 h-4" />, text: "Extract and map precise GPS coordinates instantly" },
        { icon: <Target className="w-4 h-4" />, text: "Live confidence scoring visual indicators" },
        { icon: <Shield className="w-4 h-4" />, text: "Interactive reporting dashboard for municipal operations" },
      ],
      simulation: <PotAlertSimulator />,
    },
    {
      title: "Price Tracker Tool",
      tagline: "Automated Price Monitoring & Scraper Tool",
      technologies: ["Python Automation", "BeautifulSoup", "Selenium", "SQL", "SMTP Protocols"],
      glowClr: "rgba(168, 85, 247, 0.4)",
      metric: "20% Efficiency Increase",
      features: [
        { icon: <TrendingDown className="w-4 h-4" />, text: "Automated parsing and product price fluctuation tracking" },
        { icon: <Mail className="w-4 h-4" />, text: "Instant SMTP email notifications on target threshold alert drops" },
        { icon: <RefreshCw className="w-4 h-4" />, text: "Daily scheduled scraper tasks running autonomously via cron" },
        { icon: <Shield className="w-4 h-4" />, text: "Smart rate-limiting and browser spoofing headers configured" },
      ],
      simulation: <PriceTrackerSimulator />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
      {projectsData.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
