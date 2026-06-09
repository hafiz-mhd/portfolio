"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, Terminal, Loader2 } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [cliLines, setCliLines] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const simulateFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    setCliLines([]);

    const steps = [
      "sys_auth: Authenticating client request packet...",
      "sys_handshake: Generating public/private keypair...",
      `sys_package: Binding payload metadata [Sender: ${form.name.slice(0, 16)}]`,
      "sys_network: Resolving DNS for SMTP gateway...",
      "sys_crypto: Wrapping data packet with AES-256-GCM encryption...",
      "sys_transmit: Routing packets through secure nodes...",
      "sys_ack: Dispatch successful. Response Code 202 accepted.",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setCliLines((prev) => [...prev, steps[i]]);
    }

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
      {/* 1. Contact Information Panel (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div>
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
              {"// Encrypted Communication Link"}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
              Get in Touch
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-2 font-sans">
              Establish a secure telemetry link. Reach out via direct channels or transmit a encrypted payload package.
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone Holographic Card */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-md hover:border-cyan-500/25 hover:shadow-[0_0_20px_rgba(6,182,212,0.06)] transition-all duration-300 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full blur-lg" />
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                <Phone className="w-5 h-5 animate-pulse" />
              </div>
              <div className="z-10">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Direct Line</span>
                <a href="tel:+919747012370" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                  +91 9747012370
                </a>
              </div>
            </div>

            {/* Email Holographic Card */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-md hover:border-purple-500/25 hover:shadow-[0_0_20px_rgba(168,85,247,0.06)] transition-all duration-300 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full blur-lg" />
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div className="z-10">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Secure Email</span>
                <a href="mailto:hafizmuhammedar123@gmail.com" className="text-sm font-bold text-slate-200 hover:text-purple-400 transition-colors">
                  hafizmuhammedar123@gmail.com
                </a>
              </div>
            </div>

            {/* Location Holographic Card */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-md hover:border-emerald-500/25 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)] transition-all duration-300 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full blur-lg" />
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="z-10">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Global Coordinates</span>
                <span className="text-sm font-bold text-slate-200 block">
                  Kasaragod, Kerala, India
                </span>
                <span className="text-[8px] font-mono text-slate-500">12.4996° N, 75.0079° E</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Social Buttons */}
        <div className="flex gap-4 pt-4 lg:pt-0">
          <a
            href="https://github.com/hafiz-mhd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <GithubIcon className="w-4 h-4" /> Github
          </a>
          <a
            href="https://www.linkedin.com/in/ar-hafiz-muhammed-783702322"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-purple-500/40 text-slate-300 hover:text-purple-400 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <LinkedinIcon className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </div>

      {/* 2. Interactive Send Payload Card (7 Columns) */}
      <div className="lg:col-span-7">
        <div className="p-6 md:p-8 rounded-3xl bg-slate-950/30 border border-slate-900 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          {/* Subtle tech background grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.02] pointer-events-none" />

          {status !== "sending" && status !== "success" ? (
            <form onSubmit={simulateFormSubmit} className="space-y-5 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input Name */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Name Signature</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Identify name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/30 border border-slate-900 focus:border-purple-500/40 focus:bg-slate-900/60 focus:outline-none text-slate-200 text-sm font-sans transition-all duration-300 focus:shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                  />
                </div>

                {/* Input Email */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Return Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/30 border border-slate-900 focus:border-purple-500/40 focus:bg-slate-900/60 focus:outline-none text-slate-200 text-sm font-sans transition-all duration-300 focus:shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                  />
                </div>
              </div>

              {/* Message Payload */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Transmission Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleInputChange}
                  placeholder="Insert transmission contents..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/30 border border-slate-900 focus:border-purple-500/40 focus:bg-slate-900/60 focus:outline-none text-slate-200 text-sm font-sans transition-all duration-300 resize-none focus:shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                />
              </div>

              {/* Secure Send Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] cursor-pointer"
              >
                Transmit Payload <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="min-h-[280px] flex flex-col justify-between font-mono relative">
              {/* Telemetry handshake simulator console */}
              <div className="space-y-2 text-xs md:text-sm flex-1">
                <div className="flex items-center gap-2 text-slate-500 border-b border-slate-900 pb-2 mb-3">
                  <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>TRANSMISSION_CONSOLES // ESTABLISHING_LINK</span>
                </div>

                {cliLines.map((line, idx) => {
                  const isSuccess = line.includes("successful") || line.includes("ack:");
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={isSuccess ? "text-emerald-400 font-bold" : "text-slate-300"}
                    >
                      &gt; {line}
                    </motion.div>
                  );
                })}

                {status === "sending" && (
                  <div className="flex items-center gap-2 text-cyan-400 pt-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="animate-pulse">Handshaking sockets...</span>
                  </div>
                )}
              </div>

              {/* SUCCESS POPUP MESSAGE PANEL */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4 border-t border-slate-900/60"
                  >
                    <div className="inline-flex w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 items-center justify-center text-base font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-bounce">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Payload Transmitted Successfully</h4>
                      <p className="text-[10px] text-slate-500 mt-1">SMTP packet routing acknowledged. Node response returned successfully.</p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-4 py-2 border border-slate-800 text-[9px] uppercase font-bold tracking-widest text-slate-400 hover:text-white hover:border-slate-700 rounded transition-all cursor-pointer"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
