"use client";

import { motion } from "framer-motion";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Sound } from "@/lib/sound";
import { useSound } from "@/lib/use-sound";

export function SoundToggle() {
  const { enabled, toggle } = useSound();

  const handleToggle = () => {
    toggle();
    Sound.setEnabled(!enabled);
    if (enabled) {
      Sound.play("click");
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition-colors cursor-pointer"
      aria-label={enabled ? "Desactivar sonido" : "Activar sonido"}
    >
      {enabled ? <HiSpeakerWave size={20} /> : <HiSpeakerXMark size={20} />}
    </motion.button>
  );
}
