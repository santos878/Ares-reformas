"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;
let retryCount = 0;

function startPhonk() {
  if (isPlaying || !Sound.isEnabled()) return;

  try {
    audioElement = new Audio("https://cdn.pixabay.com/download/audio/2026/06/21/audio_f600ffefcb.mp3?filename=apalonbeats-phonk-music-phonk-549460.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.5;
    audioElement.play().catch(() => {});
    isPlaying = true;
  } catch {}
}

function stopPhonk() {
  isPlaying = false;
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement = null;
  }
}

export function BackgroundMusic() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled && !isPlaying) {
        startPhonk();
      } else if (!isEnabled && isPlaying) {
        stopPhonk();
      }
    });

    // Intentar autoplay inmediatamente
    if (Sound.isEnabled() && !isPlaying) startPhonk();

    // Reintentar hasta que funcione (máx 5 intentos)
    const retryInterval = setInterval(() => {
      if (retryCount >= 5 || isPlaying) {
        clearInterval(retryInterval);
        return;
      }
      retryCount++;
      if (Sound.isEnabled() && !isPlaying) startPhonk();
    }, 800);

    // Fallback: al hacer click/touch
    const handleInteraction = () => {
      clearInterval(retryInterval);
      if (!isPlaying && Sound.isEnabled()) startPhonk();
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      unsubscribe();
      clearInterval(retryInterval);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      stopPhonk();
    };
  }, []);

  return null;
}