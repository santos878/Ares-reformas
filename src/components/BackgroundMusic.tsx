"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

// Lo-Fi Jazz - estilo "The Player" / Lofi Girl
// Acordes de jazz suaves con ritmo relajado
const lofiProgression = [
  // Am7 - Dm7 - G7 - Cmaj7 (ii-V-I clásico lofi)
  { chord: [220, 262, 330], bass: 110 },
  { chord: [294, 349, 440], bass: 147 },
  { chord: [196, 247, 330], bass: 98 },
  { chord: [262, 330, 392], bass: 131 },

  // Fmaj7 - Em7 - Am7 - Dm7
  { chord: [175, 220, 262], bass: 87 },
  { chord: [165, 196, 247], bass: 82 },
  { chord: [220, 262, 330], bass: 110 },
  { chord: [294, 349, 440], bass: 147 },

  // G7 - Cmaj7 - Fmaj7 - G7
  { chord: [196, 247, 330], bass: 98 },
  { chord: [262, 330, 392], bass: 131 },
  { chord: [175, 220, 262], bass: 87 },
  { chord: [196, 247, 330], bass: 98 },
];

// Melodía lo-fi jazz suave (piano eléctrico)
const lofiMelody = [
  440, 494, 523, 494, 440, 392, 440, 494,
  523, 587, 523, 494, 440, 392, 349, 392,
  440, 494, 523, 587, 659, 587, 523, 494,
  440, 392, 349, 330, 349, 392, 440, 392,
  349, 330, 294, 262, 294, 330, 349, 392,
  330, 294, 262, 247, 262, 294, 330, 294,
];

function playLofiChord(notes: number[], ctx: AudioContext, startTime: number) {
  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.012, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 1.3);
  });
}

function playLofiBass(freq: number, ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.02, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.9);
}

function playLofiMelody(freq: number, ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.008, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.6);
}

function startMelody() {
  if (isPlaying || !Sound.isEnabled()) return;

  try {
    audioCtx = new AudioContext();
    isPlaying = true;
    let chordIndex = 0;
    let melodyIndex = 0;

    const playBeat = () => {
      if (!audioCtx || !isPlaying) return;

      const now = audioCtx.currentTime;
      const progression = lofiProgression[chordIndex];

      // Acorde lo-fi (suave, sostenido)
      playLofiChord(progression.chord, audioCtx, now);

      // Bajo lo-fi
      playLofiBass(progression.bass, audioCtx, now);

      // Nota de melodía (piano eléctrico)
      playLofiMelody(lofiMelody[melodyIndex], audioCtx, now + 0.15);

      chordIndex = (chordIndex + 1) % lofiProgression.length;
      melodyIndex = (melodyIndex + 1) % lofiMelody.length;

      // Tempo lo-fi relajado ~90bpm
      const nextDelay = 650 + (Math.random() > 0.5 ? 50 : 0);
      timeoutId = setTimeout(playBeat, nextDelay);
    };

    playBeat();
  } catch {}
}

function stopMelody() {
  isPlaying = false;
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
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