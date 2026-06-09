"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield, Eye, TrendingDown, Target, Navigation, Mail, RefreshCw, Cpu, Activity, Play } from "lucide-react";

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
      // Simulate pothole detections every few seconds
      setDetected(true);
      
      // randomize slightly around Kasaragod
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
      {/* Simulation Background Screen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_80%)]" />

      {/* Grid backing lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-10" />

      {/* Mock Video Stream of Road */}
      <div className="absolute inset-0 flex flex-col justify-between p-3 z-10">
        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-1">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[9px] uppercase font-bold text-slate-300">YOLOv8_FEED: CAMERA_01</span>
          </div>
          <span className="text-[9px] text-slate-500">60 FPS // HD</span>
        </div>

        {/* Dynamic Road Animation */}
        <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden">
          {/* Vanishing road lines */}
          <div className="absolute w-[2px] h-full bg-slate-800/40 rotate-12 left-1/3" />
          <div className="absolute w-[2px] h-full bg-slate-800/40 -rotate-12 right-1/3" />

          {/* Drifting Road Center dashes */}
          {isPlaying && (
            <div className="absolute w-[3px] h-full flex flex-col gap-6 items-center top-0">
              <div className="w-1 h-8 bg-slate-600 animate-[panDown_1.2s_linear_infinite]" />
              <div className="w-1 h-8 bg-slate-600 animate-[panDown_1.2s_linear_infinite]" />
            </div>
          )}

          {/* Pothole Bounding Box Detection overlay */}
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

        {/* Telemetry Footer */}
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
        // keep only last 5 lines for screen fit
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
      {/* Simulation Screen Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_80%)]" />

      {/* Terminal Title */}
      <div className="flex justify-between items-center border-b border-purple-500/20 pb-1 z-10 text-slate-400">
        <div className="flex items-center gap-1.5 font-bold">
          <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>CRON_MONITOR: SCRAPING_RELAY</span>
        </div>
        <span>CYCLE: 24H</span>
      </div>

      {/* Scrolling logs screen */}
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

      {/* Analytics telemetry metrics */}
      <div className="border-t border-purple-500/20 pt-1 flex justify-between text-[8px] text-slate-500 z-10 font-bold">
        <span>ITEMS_TRACKED: 154</span>
        <span>SMTP: ONLINE</span>
        <span>EFFICIENCY: +20%</span>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth card tilting
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
      {/* Dynamic Glow Backing */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"
        style={{ backgroundColor: project.glowClr }}
      />

      {/* Main Glass Panel */}
      <div className="h-full rounded-3xl bg-slate-950/50 border border-slate-900 p-6 md:p-8 backdrop-blur-2xl transition-all duration-300 group-hover:border-purple-500/20 relative overflow-hidden flex flex-col justify-between">
        
        {/* Fine background tech matrix grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />

        {/* Scanline visual overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          {/* Header Row */}
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

          {/* Project Simulation Widget (Real-time Showcase) */}
          <div className="mb-6">
            {project.simulation}
          </div>

          {/* Technology Tags */}
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

          {/* Bullet points features list */}
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

        {/* Card Footer action panel */}
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
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
      {projectsData.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
