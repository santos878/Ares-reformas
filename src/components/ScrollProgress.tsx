"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sound } from "@/lib/sound";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScroll.current > 150) {
        Sound.play("scroll");
        lastScroll.current = now;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}
