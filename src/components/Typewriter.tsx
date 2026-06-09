"use client";

import React, { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting phase
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing phase
      timer = setTimeout(() => {
        setCurrentText((prev) => activeWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Handle state transitions
    if (!isDeleting && currentText === activeWord) {
      // Word fully typed, pause before deleting
      timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && currentText === "") {
      // Word deleted, move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="font-mono text-cyan-400 font-bold border-r-2 border-cyan-400 pr-1 animate-pulse">
      {currentText}
    </span>
  );
}
