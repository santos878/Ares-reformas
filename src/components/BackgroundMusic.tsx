"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;
let isStarting = false;

function startPhonk() {
  if (isPlaying || isStarting) return;

  isStarting = true;
  try {
    audioElement = new Audio("/audio/phonk-bg.mp3");
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

    // Intentar autoplay inmediatamente
    startPhonk();

    // Sincronizar con toggle de sonido
    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled && !isPlaying) {
        startPhonk();
      } else if (!isEnabled && isPlaying) {
        stopPhonk();
      }
    });

    // Al hacer click/touch en cualquier parte
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
