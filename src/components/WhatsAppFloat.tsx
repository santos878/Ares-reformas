"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Sound } from "@/lib/sound";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 300], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const phone = "34623293274";
  const message = "Hola, me gustaría información sobre vuestros servicios de reformas.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      style={{ opacity }}
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0] }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => Sound.play("hover")}
    >
      <motion.div
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/40"
        animate={{ boxShadow: ["0 0 0 0 rgba(37, 211, 102, 0.7)", "0 0 0 20px rgba(37, 211, 102, 0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaWhatsapp size={28} className="text-white" />
      </motion.div>
      
      <motion.span
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 pointer-events-none"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        WhatsApp
      </motion.span>
    </motion.a>
  );
}