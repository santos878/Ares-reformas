type SoundType = "click" | "hover" | "success" | "error" | "scroll";

let audioContext: AudioContext | null = null;
let enabled = true;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.08) {
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

export const Sound = {
  play(type: SoundType) {
    switch (type) {
      case "click":
        playTone(800, 0.08, "square", 0.04);
        break;
      case "hover":
        playTone(1200, 0.04, "sine", 0.03);
        break;
      case "success":
        playTone(523, 0.1, "sine", 0.06);
        setTimeout(() => playTone(659, 0.1, "sine", 0.06), 100);
        setTimeout(() => playTone(784, 0.15, "sine", 0.06), 200);
        break;
      case "error":
        playTone(200, 0.15, "sawtooth", 0.05);
        setTimeout(() => playTone(180, 0.2, "sawtooth", 0.05), 150);
        break;
      case "scroll":
        playTone(1000, 0.03, "sine", 0.01);
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
