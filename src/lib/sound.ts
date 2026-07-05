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

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.06) {
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

function playChord(frequencies: number[], duration: number, type: OscillatorType = "sine", volume = 0.04) {
  if (!enabled) return;
  frequencies.forEach((freq) => playTone(freq, duration, type, volume));
}

function playSequence(notes: { freq: number; delay: number; dur: number; type?: OscillatorType; vol?: number }[]) {
  if (!enabled) return;
  notes.forEach(({ freq, delay, dur, type = "sine", vol = 0.05 }) => {
    setTimeout(() => playTone(freq, dur, type, vol), delay);
  });
}

export const Sound = {
  play(type: SoundType) {
    switch (type) {
      case "click":
        playSequence([
          { freq: 600, delay: 0, dur: 0.06, type: "square", vol: 0.03 },
          { freq: 900, delay: 30, dur: 0.08, type: "sine", vol: 0.04 },
        ]);
        break;

      case "hover":
        playSequence([
          { freq: 1100, delay: 0, dur: 0.04, type: "sine", vol: 0.025 },
          { freq: 1400, delay: 20, dur: 0.03, type: "sine", vol: 0.02 },
        ]);
        break;

      case "success":
        playSequence([
          { freq: 523, delay: 0, dur: 0.12, type: "sine", vol: 0.05 },
          { freq: 659, delay: 80, dur: 0.12, type: "sine", vol: 0.05 },
          { freq: 784, delay: 160, dur: 0.18, type: "sine", vol: 0.06 },
          { freq: 1047, delay: 240, dur: 0.25, type: "triangle", vol: 0.04 },
        ]);
        break;

      case "error":
        playSequence([
          { freq: 200, delay: 0, dur: 0.15, type: "sawtooth", vol: 0.04 },
          { freq: 150, delay: 120, dur: 0.2, type: "sawtooth", vol: 0.04 },
          { freq: 100, delay: 240, dur: 0.3, type: "sawtooth", vol: 0.03 },
        ]);
        break;

      case "scroll":
        playTone(1200, 0.02, "sine", 0.008);
        break;

      case "nav":
        playSequence([
          { freq: 800, delay: 0, dur: 0.05, type: "sine", vol: 0.03 },
          { freq: 1000, delay: 40, dur: 0.06, type: "sine", vol: 0.035 },
        ]);
        break;

      case "submit":
        playSequence([
          { freq: 440, delay: 0, dur: 0.08, type: "triangle", vol: 0.04 },
          { freq: 554, delay: 60, dur: 0.08, type: "triangle", vol: 0.04 },
          { freq: 659, delay: 120, dur: 0.1, type: "triangle", vol: 0.045 },
          { freq: 880, delay: 200, dur: 0.15, type: "sine", vol: 0.05 },
        ]);
        break;

      case "focus":
        playTone(2000, 0.015, "sine", 0.015);
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