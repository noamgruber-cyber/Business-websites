"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const springConfig = { stiffness: 400, damping: 30, mass: 0.5 };
  const dotX = useSpring(0, { stiffness: 600, damping: 35 });
  const dotY = useSpring(0, { stiffness: 600, damping: 35 });
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const checkCursor = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const style = window.getComputedStyle(el);
      setIsPointer(style.cursor === "pointer");
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousemove", checkCursor);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // Hide native cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", checkCursor);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot — tight, fast */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isClicking ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </motion.div>

      {/* Ring — lagging, elastic */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isPointer ? 1.6 : isClicking ? 0.8 : 1,
          opacity: isPointer ? 0.6 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-9 h-9 rounded-full border border-purple-400/60" />
      </motion.div>
    </>
  );
}
