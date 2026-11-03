"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Text-to-speech with the browser's built-in voices (spec 003, FR-5). No
 * external service: nothing leaves the visitor's device.
 */
const noop = () => () => {};

export function useSpeechSupported() {
  return useSyncExternalStore(
    noop,
    () => typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    () => false,
  );
}

function englishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-US" && /natural|google|samantha|aria|jenny/i.test(v.name)) ??
    voices.find((v) => v.lang === "en-US") ??
    voices.find((v) => v.lang.startsWith("en"))
  );
}

/** Speaks English text; `speaking` is true while this hook's utterance plays. */
export function useSpeech() {
  const supported = useSpeechSupported();
  const [speaking, setSpeaking] = useState(false);
  const current = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string, rate = 0.9) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      // Typographic apostrophes can be read out as symbols by some voices.
      const u = new SpeechSynthesisUtterance(text.replace(/[’‘]/g, "'").replace(/…/g, "..."));
      u.lang = "en-US";
      u.rate = rate;
      const voice = englishVoice();
      if (voice) u.voice = voice;
      u.onstart = () => setSpeaking(true);
      u.onend = u.onerror = () => {
        if (current.current === u) setSpeaking(false);
      };
      current.current = u;
      synth.speak(u);
    },
    [supported],
  );

  useEffect(
    () => () => {
      if (current.current && typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [],
  );

  return { supported, speaking, speak };
}
