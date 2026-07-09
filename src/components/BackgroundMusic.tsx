"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;

function playPhonk() {
  if (audioElement) return;
  try {
    const el = new Audio("/audio/phonk-bg.mp3");
    el.loop = true;
    el.volume = 0.5;
    audioElement = el;
    el.play().catch(() => {
      if (audioElement === el) {
        audioElement = null;
      }
    });
  } catch {}
}

function stopPhonk() {
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

    playPhonk();

    const unsubscribe = Sound.onChange((enabled) => {
      if (enabled) playPhonk();
      else stopPhonk();
    });

    const onInteract = () => playPhonk();
    document.addEventListener("click", onInteract);
    document.addEventListener("touchstart", onInteract);

    return () => {
      unsubscribe();
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
      stopPhonk();
    };
  }, []);

  return null;
}