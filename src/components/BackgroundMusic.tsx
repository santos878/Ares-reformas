"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;

function ensureAudio() {
  if (!audioElement) {
    const el = new Audio("/audio/phonk-bg.mp3");
    el.loop = true;
    el.volume = 0.5;
    audioElement = el;
  }
  return audioElement;
}

function playPhonk() {
  const el = ensureAudio();
  el.play().catch(() => {});
}

function pausePhonk() {
  if (audioElement) {
    audioElement.pause();
  }
}

export function BackgroundMusic() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Sincronizar estado inicial por si Sound ya está en false (localStorage)
    if (!Sound.isEnabled()) {
      pausePhonk();
    } else {
      playPhonk();
    }

    const unsubscribe = Sound.onChange((enabled) => {
      if (enabled) playPhonk();
      else pausePhonk();
    });

    const onInteract = () => playPhonk();
    document.addEventListener("click", onInteract);
    document.addEventListener("touchstart", onInteract);

    return () => {
      unsubscribe();
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
      pausePhonk();
    };
  }, []);

  return null;
}