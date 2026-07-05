type SoundType =
  | "click"
  | "hover"
  | "success"
  | "error"
  | "scroll"
  | "nav"
  | "submit"
  | "focus";

let audioContext: AudioContext | null = null;
let enabled = true;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.05) {
  if (!enabled) return;
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function playSequence(notes: { freq: number; delay: number; dur: number; type?: OscillatorType; vol?: number }[]) {
  if (!enabled) return;
  notes.forEach(({ freq, delay, dur, type = "square", vol = 0.04 }) => {
    setTimeout(() => playTone(freq, dur, type, vol), delay);
  });
}

// Melodías arcade cortas estilo chiptune
const MELODIES = {
  // Click: notas ascendentes rápidas (como seleccionar en menú arcade)
  click: [
    { freq: 523, delay: 0, dur: 0.04, type: "square" as const, vol: 0.035 },
    { freq: 659, delay: 25, dur: 0.04, type: "square" as const, vol: 0.03 },
    { freq: 784, delay: 50, dur: 0.05, type: "square" as const, vol: 0.025 },
  ],

  // Hover: nota suave individual (como hover en pixel art)
  hover: [
    { freq: 1047, delay: 0, dur: 0.03, type: "triangle" as const, vol: 0.02 },
  ],

  // Nav: arpegio rápido (como cambiar de pantalla)
  nav: [
    { freq: 440, delay: 0, dur: 0.04, type: "square" as const, vol: 0.03 },
    { freq: 554, delay: 30, dur: 0.04, type: "square" as const, vol: 0.03 },
    { freq: 659, delay: 60, dur: 0.04, type: "square" as const, vol: 0.03 },
    { freq: 880, delay: 90, dur: 0.06, type: "triangle" as const, vol: 0.025 },
  ],

  // Submit: fanfarria de victoria (como completar nivel)
  submit: [
    { freq: 523, delay: 0, dur: 0.08, type: "square" as const, vol: 0.04 },
    { freq: 659, delay: 70, dur: 0.08, type: "square" as const, vol: 0.04 },
    { freq: 784, delay: 140, dur: 0.08, type: "square" as const, vol: 0.04 },
    { freq: 1047, delay: 210, dur: 0.15, type: "triangle" as const, vol: 0.035 },
    { freq: 1319, delay: 280, dur: 0.2, type: "triangle" as const, vol: 0.03 },
  ],

  // Success: melodía corta de logro (como desbloquear algo)
  success: [
    { freq: 392, delay: 0, dur: 0.06, type: "square" as const, vol: 0.035 },
    { freq: 523, delay: 50, dur: 0.06, type: "square" as const, vol: 0.035 },
    { freq: 659, delay: 100, dur: 0.06, type: "square" as const, vol: 0.035 },
    { freq: 784, delay: 150, dur: 0.06, type: "square" as const, vol: 0.035 },
    { freq: 1047, delay: 200, dur: 0.12, type: "triangle" as const, vol: 0.03 },
    { freq: 1319, delay: 280, dur: 0.18, type: "triangle" as const, vol: 0.025 },
  ],

  // Error: tono descendente (como perder vida)
  error: [
    { freq: 392, delay: 0, dur: 0.1, type: "square" as const, vol: 0.035 },
    { freq: 330, delay: 80, dur: 0.1, type: "square" as const, vol: 0.035 },
    { freq: 262, delay: 160, dur: 0.15, type: "square" as const, vol: 0.03 },
  ],

  // Scroll: tick ultra sutil
  scroll: [
    { freq: 1800, delay: 0, dur: 0.015, type: "triangle" as const, vol: 0.008 },
  ],

  // Focus: micro-click (como cursor parpadeando)
  focus: [
    { freq: 2200, delay: 0, dur: 0.01, type: "square" as const, vol: 0.012 },
  ],
};

export const Sound = {
  play(type: SoundType) {
    switch (type) {
      case "click":
        playSequence(MELODIES.click);
        break;
      case "hover":
        playSequence(MELODIES.hover);
        break;
      case "nav":
        playSequence(MELODIES.nav);
        break;
      case "submit":
        playSequence(MELODIES.submit);
        break;
      case "success":
        playSequence(MELODIES.success);
        break;
      case "error":
        playSequence(MELODIES.error);
        break;
      case "scroll":
        playSequence(MELODIES.scroll);
        break;
      case "focus":
        playSequence(MELODIES.focus);
        break;
    }
  },
  setEnabled(value: boolean) {
    enabled = value;
  },
  isEnabled() {
    return enabled;
  },
};