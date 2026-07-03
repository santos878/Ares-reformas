"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  label?: string;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Antes",
  afterAlt = "Después",
  label,
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPos)));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => handleMove(e.touches[0].clientX), [handleMove]);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd]);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {label && (
        <div className="text-center mb-6">
          <span className="px-3 py-1 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-semibold tracking-wider uppercase">
            {label}
          </span>
        </div>
      )}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Before image (full width, bottom layer) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${beforeSrc}')` }}
          role="img"
          aria-label={beforeAlt}
        />
        {/* After image (clipped, top layer) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${afterSrc}')`,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
          role="img"
          aria-label={afterAlt}
        />
        {/* Divider line */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none flex items-center justify-center z-10"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          animate={{ scaleY: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </motion.div>
        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider z-10">
          Antes
        </div>
        <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider z-10">
          Después
        </div>
      </div>
      <div className="flex justify-center mt-4 text-sm text-gray-500">
        <span>← Arrastra para comparar →</span>
      </div>
    </div>
  );
}

interface BeforeAfterGridProps {
  items: Array<{
    beforeSrc: string;
    afterSrc: string;
    label?: string;
    title: string;
    category: string;
  }>;
}

export function BeforeAfterGrid({ items }: BeforeAfterGridProps) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-500 font-semibold tracking-[0.3em] uppercase text-sm">
            Antes y Después
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
            Transformaciones reales
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Desliza para comparar. Cada proyecto cuenta una historia de cambio.
          </p>
        </div>
        <div className="space-y-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-red-500 font-semibold tracking-[0.2em] uppercase text-sm">
                    {item.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>
              <BeforeAfter
                beforeSrc={item.beforeSrc}
                afterSrc={item.afterSrc}
                label={`${item.category} • ${item.title}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}