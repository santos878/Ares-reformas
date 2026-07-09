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

    if (Sound.isEnabled()) {
      playPhonk();
    }

    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled) playPhonk();
      else pausePhonk();
    });

    return () => {
      unsubscribe();
      pausePhonk();
    };
  }, []);

  return null;
}