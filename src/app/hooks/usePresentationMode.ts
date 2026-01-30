"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export function usePresentationMode(
  sectionIds: string[],
  scrollRef?: RefObject<HTMLElement>
) {
  const [enabled, setEnabled] = useState(false);
  const [index, setIndex] = useState(0);
  const lock = useRef(false);

  // 🔒 clé stable: même si l'array est recréé, on dépend d'une valeur primitive
  const sectionKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  // Optionnel: si index dépasse (ex: sectionIds raccourci), on le recale
  useEffect(() => {
    if (index > sectionIds.length - 1) setIndex(Math.max(0, sectionIds.length - 1));
  }, [index, sectionKey]); // sectionKey suffit

  useEffect(() => {
    if (!enabled) return;

    const container = scrollRef?.current;

    const prevOverflow = container
      ? container.style.overflowY
      : document.body.style.overflow;

    if (container) container.style.overflowY = "hidden";
    else document.body.style.overflow = "hidden";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lock.current) return;

      lock.current = true;
      setTimeout(() => (lock.current = false), 700);

      if (e.deltaY > 0 && index < sectionIds.length - 1) {
        setIndex((i) => i + 1);
      } else if (e.deltaY < 0 && index > 0) {
        setIndex((i) => i - 1);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && index < sectionIds.length - 1) setIndex((i) => i + 1);
      if (e.key === "ArrowUp" && index > 0) setIndex((i) => i - 1);
    };

    const target: any = container ?? window;
    target.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      if (container) container.style.overflowY = prevOverflow;
      else document.body.style.overflow = prevOverflow;

      target.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
    // ✅ deps stables
  }, [enabled, index, sectionKey]);

  useEffect(() => {
    if (!enabled) return;
    const id = sectionIds[index];
    if (!id) return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [index, enabled, sectionKey]);

  return {
    enabled,
    setEnabled,
    index,
    total: sectionIds.length,
    next: () => index < sectionIds.length - 1 && setIndex((i) => i + 1),
    prev: () => index > 0 && setIndex((i) => i - 1),
  };
}
