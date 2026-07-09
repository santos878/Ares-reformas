"use client";

import { useEffect, useRef } from "react";
import { Sound } from "@/lib/sound";

let audioContext: AudioContext | null = null;
let isPlaying = false;
let currentSource: AudioBufferSourceNode | null = null;
let gainNode: GainNode | null = null;
let audioBuffer: AudioBuffer | null = null;

async function loadAndPlay() {
  if (isPlaying) return;

  try {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    if (!gainNode) {
      gainNode = audioContext.createGain();
      gainNode.gain.value = 0.5;
      gainNode.connect(audioContext.destination);
    }

    if (!audioBuffer) {
      const response = await fetch("https://cdn.pixabay.com/download/audio/2026/06/21/audio_f600ffefcb.mp3?filename=apalonbeats-phonk-music-phonk-549460.mp3");
      const arrayBuffer = await response.arrayBuffer();
      audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    }

    currentSource = audioContext.createBufferSource();
    currentSource.buffer = audioBuffer;
    currentSource.loop = true;
    currentSource.connect(gainNode);
    currentSource.start();
    isPlaying = true;
  } catch {
    isPlaying = false;
    audioContext = null;
    gainNode = null;
  }
}

function stop() {
  isPlaying = false;
  if (currentSource) {
    try { currentSource.stop(); } catch {}
    currentSource = null;
  }
  if (audioContext) {
    audioContext.close().catch(() => {});
    audioContext = null;
    gainNode = null;
  }
}

export function BackgroundMusic() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    loadAndPlay();

    const unsubscribe = Sound.onChange((isEnabled) => {
      if (isEnabled && !isPlaying) {
        loadAndPlay();
      } else if (!isEnabled && isPlaying) {
        stop();
      }
    });

    const handleInteraction = () => {
      if (!isPlaying) loadAndPlay();
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      unsubscribe();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      stop();
    };
  }, []);

  return null;
}
