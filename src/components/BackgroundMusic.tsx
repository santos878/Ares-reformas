"use client";

import { useEffect, useRef } from "react";

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;

function startMusic() {
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

function stopMusic() {
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

    startMusic();

    document.addEventListener("click", () => {
      if (!isPlaying) startMusic();
    });
    document.addEventListener("touchstart", () => {
      if (!isPlaying) startMusic();
    });

    return () => {
      stopMusic();
    };
  }, []);

  return null;
}
