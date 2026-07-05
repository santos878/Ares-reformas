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

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.04) {
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
  notes.forEach(({ freq, delay, dur, type = "sine", vol = 0.035 }) => {
    setTimeout(() => playTone(freq, dur, type, vol), delay);
  });
}

export const Sound = {
  play(type: SoundType) {
    switch (type) {
      // Click: acorde suave Mayor (Do-Mi-Sol)
      case "click":
        playSequence([
          { freq: 523, delay: 0, dur: 0.08, type: "sine", vol: 0.03 },
          { freq: 659, delay: 15, dur: 0.08, type: "sine", vol: 0.025 },
          { freq: 784, delay: 30, dur: 0.1, type: "sine", vol: 0.02 },
        ]);
        break;

      // Hover: nota aguda delicada
      case "hover":
        playSequence([
          { freq: 1319, delay: 0, dur: 0.04, type: "sine", vol: 0.015 },
        ]);
        break;

      // Nav: arpegio descendente suave (como piano clásico)
      case "nav":
        playSequence([
          { freq: 784, delay: 0, dur: 0.06, type: "sine", vol: 0.025 },
          { freq: 659, delay: 40, dur: 0.06, type: "sine", vol: 0.025 },
          { freq: 523, delay: 80, dur: 0.08, type: "sine", vol: 0.025 },
        ]);
        break;

      // Submit: fanfarria clásica (acorde ascendente)
      case "submit":
        playSequence([
          { freq: 262, delay: 0, dur: 0.1, type: "triangle", vol: 0.03 },
          { freq: 330, delay: 80, dur: 0.1, type: "triangle", vol: 0.03 },
          { freq: 392, delay: 160, dur: 0.1, type: "triangle", vol: 0.03 },
          { freq: 523, delay: 240, dur: 0.2, type: "sine", vol: 0.035 },
        ]);
        break;

      // Success: resolución clásica (V-I)
      case "success":
        playSequence([
          { freq: 392, delay: 0, dur: 0.1, type: "sine", vol: 0.03 },
          { freq: 494, delay: 60, dur: 0.1, type: "sine", vol: 0.03 },
          { freq: 523, delay: 150, dur: 0.2, type: "triangle", vol: 0.035 },
        ]);
        break;

      // Error: intervalo descendente menor
      case "error":
        playSequence([
          { freq: 392, delay: 0, dur: 0.12, type: "sine", vol: 0.03 },
          { freq: 349, delay: 100, dur: 0.15, type: "sine", vol: 0.03 },
        ]);
        break;

      // Scroll: tick casi inaudible
      case "scroll":
        playTone(2000, 0.01, "sine", 0.005);
        break;

      // Focus: nota grave sutil
      case "focus":
        playTone(220, 0.02, "sine", 0.01);
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