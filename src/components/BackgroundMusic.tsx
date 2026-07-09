"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;

function startPhonk() {
  if (isPlaying) return;

  if (audioElement) {
    audioElement.pause();
    audioElement = null;
  }

  try {
    const el = new Audio("/audio/phonk-bg.mp3");
    el.loop = true;
    el.volume = 0.5;
    audioElement = el;

    const promise = el.play();
    if (promise !== undefined) {
      promise.then(() => {
        isPlaying = true;
      }).catch(() => {
        isPlaying = false;
        if (audioElement === el) {
          audioElement.pause();
          audioElement = null;
        }
      });
    } else {
      isPlaying = true;
    }
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

    // Intentar autoplay al entrar
    startPhonk();

    // Escuchar cambios del SoundToggle
    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled && !isPlaying) {
        startPhonk();
      } else if (!isEnabled) {
        stopPhonk();
      }
    });

    // Primer click/touch del usuario inicia si autoplay falló
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
