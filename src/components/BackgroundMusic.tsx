"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let intervalId: ReturnType<typeof setInterval> | null = null;

// Melodía arcade en loop - escala mayor ascendente/descendente
const melody = [
  // Frase 1: ascendente suave
  262, 294, 330, 349, 392, 440, 494, 523,
  // Frase 2: descendente
  523, 494, 440, 392, 349, 330, 294, 262,
  // Frase 3: arpegio
  262, 330, 392, 523, 392, 330, 262, 330,
  // Frase 4: resolución
  349, 392, 440, 523, 659, 523, 440, 392,
];

function playNote(freq: number, ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.015, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.2);
}

function startMelody() {
  if (isPlaying || !Sound.isEnabled()) return;
  try {
    audioCtx = new AudioContext();
    isPlaying = true;
    let noteIndex = 0;

    const playNext = () => {
      if (!audioCtx || !isPlaying) return;
      playNote(melody[noteIndex], audioCtx, audioCtx.currentTime);
      noteIndex = (noteIndex + 1) % melody.length;
    };

    intervalId = setInterval(playNext, 250);
    playNext();
  } catch {}
}

function stopMelody() {
  isPlaying = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (audioCtx) {
    audioCtx.close().catch(() => {});
    audioCtx = null;
  }
}

export function BackgroundMusic() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Esperar a que el usuario interactúe (requerido por navegadores)
    const handleInteraction = () => {
      if (!isPlaying && Sound.isEnabled()) {
        startMelody();
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      stopMelody();
    };
  }, []);

  // Escuchar cambios en el estado del sonido
  useEffect(() => {
    const checkEnabled = setInterval(() => {
      if (Sound.isEnabled() && !isPlaying) {
        startMelody();
      } else if (!Sound.isEnabled() && isPlaying) {
        stopMelody();
      }
    }, 500);

    return () => clearInterval(checkEnabled);
  }, []);

  return null;
}