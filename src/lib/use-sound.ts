"use client";

import { useState, useEffect, useCallback } from "react";

export function useSound() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("soundEnabled");
    if (stored !== null) {
      setEnabled(stored === "true");
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("soundEnabled", String(next));
      return next;
    });
  }, []);

  return { enabled, toggle };
}
