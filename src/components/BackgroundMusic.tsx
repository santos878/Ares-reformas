"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;

function startPhonk() {
  if (isPlaying) return;

  try {
    const el = new Audio("/audio/phonk-bg.mp3");
    el.loop = true;
    el.volume = 0.5;
    const promise = el.play();
    if (promise !== undefined) {
      promise.then(() => {
        isPlaying = true;
        audioElement = el;
      }).catch(() => {
        if (audioElement === el) {
          audioElement = null;
        }
      });
    } else {
      isPlaying = true;
      audioElement = el;
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
  const userInteracted = useRef(false);

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

    const handleInteraction = () => {
      if (!userInteracted.current) {
        userInteracted.current = true;
        startPhonk();
      }
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
