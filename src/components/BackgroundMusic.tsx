"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const riffNotes = [
  { melody: 165, bass: 82 },   // E
  { melody: 165, bass: 82 },   // E
  { melody: 196, bass: 98 },   // G
  { melody: 220, bass: 110 },  // A
  { melody: 165, bass: 82 },   // E
  { melody: 247, bass: 123 },  // B
  { melody: 165, bass: 82 },   // E
  { melody: 165, bass: 82 },   // E
];

function playNote(freq: number, ctx: AudioContext, startTime: number, gainLevel: number, type: OscillatorType) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(gainLevel, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.4);
}

function playBassNote(freq: number, ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.2, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.35);
}

function startParanoid() {
  if (isPlaying || !Sound.isEnabled()) return;

  try {
    audioCtx = new AudioContext();
    // Intentar resume en móvil
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    isPlaying = true;
    let index = 0;

    const playBeat = () => {
      if (!audioCtx || !isPlaying) return;

      const now = audioCtx.currentTime;
      const note = riffNotes[index];

      playNote(note.melody, audioCtx, now, 0.15, "sawtooth");
      playBassNote(note.bass, audioCtx, now + 0.02);

      index = (index + 1) % riffNotes.length;
      timeoutId = setTimeout(playBeat, 280);
    };

    playBeat();
  } catch {}
}

function stopParanoid() {
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

    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled && !isPlaying) {
        startParanoid();
      } else if (!isEnabled && isPlaying) {
        stopParanoid();
      }
    });

    const handleInteraction = () => {
      if (!isPlaying && Sound.isEnabled()) {
        startParanoid();
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      unsubscribe();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      stopParanoid();
    };
  }, []);

  return null;
}