"use client";
import { useEffect, useRef } from "react";

/** Interactive network graph: drifting nodes, linked when close, and the pointer acts as a probe node. */
export default function NetCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; const ctx = c?.getContext("2d"); if (!c || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let w = 0, h = 0, raf = 0, visible = true, pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    const size = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(18, Math.min(80, Math.floor((w * h) / 15000)));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: 1.2 + Math.random() * 1.6 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!still) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (!still && d < 120 && d > 0) { p.x += (dx / d) * 0.8; p.y += (dy / d) * 0.8; }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) { ctx.strokeStyle = `rgba(55,214,255,${(1 - d / 130) * 0.28})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 170) { ctx.strokeStyle = `rgba(61,255,160,${(1 - dm / 170) * 0.55})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        ctx.fillStyle = dm < 170 ? "rgba(61,255,160,.9)" : "rgba(55,214,255,.75)"; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      }
    };
    const loop = () => { if (visible && !document.hidden) draw(); raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = mouse.y = -9999; };
    size(); draw();
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }) : null; io?.observe(c);
    window.addEventListener("resize", size); window.addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerleave", leave);
    if (!still) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io?.disconnect(); window.removeEventListener("resize", size); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return <canvas ref={ref} className="net" aria-hidden="true" />;
}
