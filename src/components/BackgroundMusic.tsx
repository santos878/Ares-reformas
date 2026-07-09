"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;

function startPhonk() {
  if (isPlaying) return;

  try {
    audioElement = new Audio("/audio/phonk-bg.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.5;
    audioElement.play().then(() => {
      isPlaying = true;
    }).catch(() => {
      isPlaying = false;
      audioElement = null;
    });
  } catch {
    isPlaying = false;
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

    startPhonk();

    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled && !isPlaying) {
        startPhonk();
      } else if (!isEnabled && isPlaying) {
        stopPhonk();
      }
    });

    const handleInteraction = () => {
      if (!isPlaying) startPhonk();
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
