"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowUp, X } from "lucide-react";

export const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className="rv">{children}</div>;
}

export function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduce() || typeof IntersectionObserver === "undefined") { setV(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min((t - t0) / 1200, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>{v.toFixed(decimals)}{suffix}</b>;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  if (!show) return null;
  return <button className="top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" })}><ArrowUp size={18} /></button>;
}

/** Thin cyan bar at the very top showing how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const f = () => {
      raf = 0; const el = ref.current; if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(f); };
    f(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return <div className="progress" aria-hidden="true"><div ref={ref} /></div>;
}

/** Makes the glow on cards/stats follow the pointer (one listener for the whole site). */
export function PointerFX() {
  useEffect(() => {
    let raf = 0;
    const move = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(".card, .stat, .photo");
      if (!t) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { const r = t.getBoundingClientRect(); t.style.setProperty("--mx", e.clientX - r.left + "px"); t.style.setProperty("--my", e.clientY - r.top + "px"); });
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => { document.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return null;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,iframe,[tabindex]:not([tabindex="-1"])';

/**
 * Popup. Rendered in a portal on <body> so no parent animation/transform can break `position: fixed`
 * (that was why popups would not scroll). The header stays put; only .dialog-body scrolls.
 * `fit` = body does not scroll and the content (a PDF preview) fills the available height.
 */
export function Modal({ onClose, children, title, subtitle, big, fit }: { onClose: () => void; children: ReactNode; title: string; subtitle?: string; big?: boolean; fit?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose); closeRef.current = onClose;
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const prev = document.activeElement as HTMLElement | null;
    const b = document.body; const old = { o: b.style.overflow, p: b.style.paddingRight };
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    b.style.overflow = "hidden"; if (sbw > 0) b.style.paddingRight = sbw + "px";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); closeRef.current(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const f = Array.from(box.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((x) => x.offsetParent !== null);
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (e.shiftKey && (a === first || a === box.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    box.current?.focus({ preventScroll: true });
    return () => { document.removeEventListener("keydown", key); b.style.overflow = old.o; b.style.paddingRight = old.p; prev?.focus?.({ preventScroll: true }); };
  }, [mounted]);
  if (!mounted) return null;
  return createPortal(
    <div className="modal" onMouseDown={(e) => { if (e.target === e.currentTarget) closeRef.current(); }}>
      <div ref={box} className={"dialog" + (big ? " big" : "") + (fit ? " fit" : "")} role="dialog" aria-modal="true" aria-labelledby="dlg-title" tabIndex={-1}>
        <div className="dialog-head">
          <div><h3 id="dlg-title">{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
          <button className="x" onClick={() => closeRef.current()} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>, document.body);
}
