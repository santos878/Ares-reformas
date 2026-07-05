"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

// Acordes de jazz: ii-V-I en Do mayor + variaciones
// Cada acorde = [nota raíz, tercera, séptima]
const jazzProgression = [
  // ii-V-I clásico en Do
  { chord: [294, 349, 440], bass: 147 },   // Dm7
  { chord: [392, 494, 587], bass: 196 },   // G7
  { chord: [262, 330, 494], bass: 131 },   // Cmaj7

  // IVmaj7 - iii7 - vi7
  { chord: [349, 440, 523], bass: 175 },   // Fmaj7
  { chord: [330, 392, 494], bass: 165 },   // Em7
  { chord: [220, 262, 349], bass: 110 },   // Am7

  // ii-V-I con tensión
  { chord: [294, 349, 440], bass: 147 },   // Dm7
  { chord: [370, 466, 554], bass: 185 },   // Db7 (tritone sub)
  { chord: [262, 330, 494], bass: 131 },   // Cmaj7

  // Resolución suave
  { chord: [196, 247, 330], bass: 98 },    // Gmaj7
  { chord: [262, 330, 392], bass: 131 },   // C6
];

function playChord(notes: number[], ctx: AudioContext, startTime: number, vol = 0.012) {
  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.9);
  });
}

function playBass(freq: number, ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.018, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.7);
}

function playMelodyNote(freq: number, ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.008, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.5);
}

// Melodía jazz suave sobre los acordes
const jazzMelody = [
  523, 494, 440, 392, 440, 523, 587, 523,
  494, 440, 392, 349, 392, 440, 494, 523,
  440, 392, 349, 330, 349, 392, 440, 494,
  392, 349, 330, 294, 330, 392, 440, 392,
  349, 330, 294, 262, 294, 330, 349, 392,
  330, 294, 262, 247, 262, 294, 330, 349,
];

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
      const progression = jazzProgression[chordIndex];

      // Acorde
      playChord(progression.chord, audioCtx, now, 0.01);

      // Bajo
      playBass(progression.bass, audioCtx, now);

      // Nota de melodía
      playMelodyNote(jazzMelody[melodyIndex], audioCtx, now + 0.1);

      chordIndex = (chordIndex + 1) % jazzProgression.length;
      melodyIndex = (melodyIndex + 1) % jazzMelody.length;

      // Tempo jazz suave ~120bpm con swing
      const nextDelay = 800 + (Math.random() > 0.5 ? 100 : 0);
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