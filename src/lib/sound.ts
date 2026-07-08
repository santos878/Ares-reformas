type SoundType =
  | "click"
  | "hover"
  | "success"
  | "error"
  | "scroll"
  | "nav"
  | "submit"
  | "focus";

type SoundCallback = (enabled: boolean) => void;

let audioContext: AudioContext | null = null;
let enabled = true;
let masterGain: GainNode | null = null;
const listeners: Set<SoundCallback> = new Set();

const isMobile = typeof navigator !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const MOBILE_VOLUME_BOOST = isMobile ? 2.5 : 1;
const MASTER_VOLUME = isMobile ? 0.35 : 0.2;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
    masterGain = audioContext.createGain();
    masterGain.gain.value = MASTER_VOLUME;
    masterGain.connect(audioContext.destination);
  }
  return audioContext;
}

function ensureContextResumed() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();
}

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.03) {
  if (!enabled) return;
  try {
    ensureContextResumed();
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    const v = volume * MOBILE_VOLUME_BOOST;
    gain.gain.setValueAtTime(v, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function playSequence(notes: { freq: number; delay: number; dur: number; type?: OscillatorType; vol?: number }[]) {
  if (!enabled) return;
  notes.forEach(({ freq, delay, dur, type = "sine", vol = 0.025 }) => {
    setTimeout(() => playTone(freq, dur, type, vol), delay);
  });
}

export const Sound = {
  play(type: SoundType) {
    switch (type) {
      case "click":
        playSequence([
          { freq: 440, delay: 0, dur: 0.1, type: "sine", vol: 0.06 },
          { freq: 523, delay: 20, dur: 0.1, type: "sine", vol: 0.05 },
        ]);
        break;
      case "hover":
        playSequence([
          { freq: 1047, delay: 0, dur: 0.05, type: "sine", vol: 0.03 },
        ]);
        break;
      case "nav":
        playSequence([
          { freq: 523, delay: 0, dur: 0.08, type: "sine", vol: 0.05 },
          { freq: 440, delay: 50, dur: 0.08, type: "sine", vol: 0.05 },
          { freq: 349, delay: 100, dur: 0.1, type: "sine", vol: 0.05 },
        ]);
        break;
      case "submit":
        playSequence([
          { freq: 330, delay: 0, dur: 0.12, type: "sine", vol: 0.06 },
          { freq: 392, delay: 80, dur: 0.12, type: "sine", vol: 0.06 },
          { freq: 523, delay: 180, dur: 0.2, type: "triangle", vol: 0.07 },
        ]);
        break;
      case "success":
        playSequence([
          { freq: 262, delay: 0, dur: 0.12, type: "sine", vol: 0.06 },
          { freq: 330, delay: 50, dur: 0.12, type: "sine", vol: 0.06 },
          { freq: 392, delay: 120, dur: 0.18, type: "sine", vol: 0.07 },
        ]);
        break;
      case "error":
        playSequence([
          { freq: 392, delay: 0, dur: 0.15, type: "sine", vol: 0.06 },
          { freq: 330, delay: 120, dur: 0.18, type: "sine", vol: 0.06 },
        ]);
        break;
      case "scroll":
        playTone(1800, 0.01, "sine", 0.01);
        break;
      case "focus":
        playTone(220, 0.025, "sine", 0.025);
        break;
    }
  },
  setEnabled(value: boolean) {
    enabled = value;
    listeners.forEach((cb) => cb(value));
  },
  isEnabled() {
    return enabled;
  },
  onChange(callback: SoundCallback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  setMasterVolume(vol: number) {
    if (masterGain) masterGain.gain.value = vol;
  },
};

if (typeof document !== "undefined") {
  const resume = () => ensureContextResumed();
  document.addEventListener("click", resume, { once: true });
  document.addEventListener("touchstart", resume, { once: true });
  document.addEventListener("keydown", resume, { once: true });
}