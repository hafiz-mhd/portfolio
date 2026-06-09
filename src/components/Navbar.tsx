"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, ArrowRight } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-slate-950/70 border-b border-slate-900/60 backdrop-blur-xl"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group font-mono text-sm md:text-base font-bold text-slate-100 tracking-wider">
          <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span>
            AR <span className="text-purple-400 group-hover:text-cyan-400 transition-colors">HAFIZ</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs md:text-sm font-mono tracking-wider font-semibold text-slate-400 hover:text-slate-100 transition-colors relative py-1"
            >
              {item.name}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold tracking-widest text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center gap-1.5"
          >
            RESUME <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 focus:outline-none"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-900 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-mono tracking-wider font-semibold text-slate-400 hover:text-slate-100 transition-colors py-2 border-b border-slate-900"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs font-bold tracking-widest text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                DOWNLOAD RESUME <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
