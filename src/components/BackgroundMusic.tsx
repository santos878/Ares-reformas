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
        if (audioElement === el) {
          audioElement.pause();
          audioElement = null;
        }
      });
    } else {
      isPlaying = true;
    }
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

    startPhonk();

    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled) {
        startPhonk();
      } else {
        stopPhonk();
      }
    });

    const handleInteraction = () => {
      startPhonk();
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
