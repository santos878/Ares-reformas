"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Sound } from "@/lib/sound";

export function PageTransitionSound() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    Sound.play("nav");
  }, [pathname]);

  return null;
}