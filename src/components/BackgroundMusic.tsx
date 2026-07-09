"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;
let isStarting = false;

function startPhonk() {
  if (isPlaying || isStarting || !Sound.isEnabled()) return;

  isStarting = true;
  try {
    audioElement = new Audio("https://cdn.pixabay.com/download/audio/2026/06/21/audio_f600ffefcb.mp3?filename=apalonbeats-phonk-music-phonk-549460.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.5;
    const promise = audioElement.play();
    if (promise !== undefined) {
      promise.then(() => {
        isPlaying = true;
        isStarting = false;
      }).catch(() => {
        isPlaying = false;
        isStarting = false;
        if (audioElement) {
          audioElement.pause();
          audioElement = null;
        }
      });
    } else {
      isPlaying = true;
      isStarting = false;
    }
  } catch {
    isPlaying = false;
    isStarting = false;
  }
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

    // Intentar autoplay
    if (Sound.isEnabled() && !isPlaying) startPhonk();

    // Fallback: al hacer click/touch
    const handleInteraction = () => {
      if (!isPlaying && Sound.isEnabled()) startPhonk();
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      unsubscribe();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      stopPhonk();
    };
  }, []);

  return null;
}