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

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.03) {
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
  notes.forEach(({ freq, delay, dur, type = "sine", vol = 0.025 }) => {
    setTimeout(() => playTone(freq, dur, type, vol), delay);
  });
}

export const Sound = {
  play(type: SoundType) {
    switch (type) {
      // Click: acorde lo-fi suave (Am)
      case "click":
        playSequence([
          { freq: 440, delay: 0, dur: 0.1, type: "sine", vol: 0.02 },
          { freq: 523, delay: 20, dur: 0.1, type: "sine", vol: 0.018 },
        ]);
        break;

      // Hover: nota aguda delicada (piano eléctrico)
      case "hover":
        playSequence([
          { freq: 1047, delay: 0, dur: 0.05, type: "sine", vol: 0.01 },
        ]);
        break;

      // Nav: arpegio descendente suave
      case "nav":
        playSequence([
          { freq: 523, delay: 0, dur: 0.08, type: "sine", vol: 0.018 },
          { freq: 440, delay: 50, dur: 0.08, type: "sine", vol: 0.018 },
          { freq: 349, delay: 100, dur: 0.1, type: "sine", vol: 0.018 },
        ]);
        break;

      // Submit: fanfarria lo-fi (resolución)
      case "submit":
        playSequence([
          { freq: 330, delay: 0, dur: 0.12, type: "sine", vol: 0.02 },
          { freq: 392, delay: 80, dur: 0.12, type: "sine", vol: 0.02 },
          { freq: 523, delay: 180, dur: 0.2, type: "triangle", vol: 0.022 },
        ]);
        break;

      // Success: acorde Mayor suave
      case "success":
        playSequence([
          { freq: 262, delay: 0, dur: 0.12, type: "sine", vol: 0.02 },
          { freq: 330, delay: 50, dur: 0.12, type: "sine", vol: 0.02 },
          { freq: 392, delay: 120, dur: 0.18, type: "sine", vol: 0.022 },
        ]);
        break;

      // Error: nota descendente suave
      case "error":
        playSequence([
          { freq: 392, delay: 0, dur: 0.15, type: "sine", vol: 0.02 },
          { freq: 330, delay: 120, dur: 0.18, type: "sine", vol: 0.02 },
        ]);
        break;

      // Scroll: casi inaudible
      case "scroll":
        playTone(1800, 0.01, "sine", 0.003);
        break;

      // Focus: nota grave muy suave
      case "focus":
        playTone(220, 0.025, "sine", 0.008);
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