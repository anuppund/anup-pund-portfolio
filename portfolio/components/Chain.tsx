"use client";
import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, RotateCcw } from "lucide-react";

const blocks = [
  ["Foundations of Cybersecurity", "Google, Jan 2025"],
  ["Cyber Security Analyst Intern", "Launched Global, Jun 2025"],
  ["Ethical Hacking", "NPTEL, IIT Kharagpur, 2026"],
  ["Deepfake Forensics System", "Tamper-evident reporting"],
];

// Real SHA-256 where the browser allows it (https / localhost), small fallback hash otherwise.
async function sha(s: string): Promise<string> {
  try {
    if (window.crypto?.subtle) { const b = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)); return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join(""); }
  } catch { /* fall through */ }
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return ((h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0")).repeat(4);
}
async function compute(tampered: number | null) {
  const out: string[] = []; let prev = "0".repeat(64);
  for (let i = 0; i < blocks.length; i++) { prev = await sha(prev + "|" + blocks[i][0] + "|" + blocks[i][1] + (tampered === i ? "|ALTERED" : "")); out.push(prev); }
  return out;
}

export default function Chain() {
  const [stored, setStored] = useState<string[]>([]); const [live, setLive] = useState<string[]>([]); const [bad, setBad] = useState<number | null>(null);
  useEffect(() => { let on = true; compute(null).then((h) => on && (setStored(h), setLive(h))); return () => { on = false; }; }, []);
  useEffect(() => { let on = true; if (stored.length) compute(bad).then((h) => on && setLive(h)); return () => { on = false; }; }, [bad, stored]);
  const ok = (i: number) => !stored.length || live[i] === stored[i];
  const broken = stored.length > 0 && live.length > 0 && live.some((h, i) => h !== stored[i]);
  const short = (h?: string) => (h ? h.slice(0, 8) + "…" + h.slice(-4) : "computing…");
  return (
    <div className="chain-demo">
      <div className="chain" role="list">
        {blocks.map(([t, s], i) => {
          const good = ok(i);
          return (
            <button role="listitem" key={t} type="button" className={"block" + (good ? "" : " bad") + (bad === i ? " src" : "")} onClick={() => setBad(bad === i ? null : i)} aria-pressed={bad === i} aria-label={`${t}. ${bad === i ? "Tampered. Click to restore." : "Click to tamper with this block."}`}>
              <b>{t}</b><span>{s}</span>
              <code>sha256: {short(live[i])}</code>
              <em>{good ? <><ShieldCheck size={14} /> hash matches</> : <><ShieldAlert size={14} /> {bad === i ? "altered block" : "hash mismatch: chain broken"}</>}</em>
            </button>
          );
        })}
      </div>
      <div className="chain-side" aria-live="polite">
        <p className={"status " + (broken ? "bad" : "good")}>{broken ? <><ShieldAlert size={18} /> Tampering detected at block {(bad ?? 0) + 1}</> : <><ShieldCheck size={18} /> Chain intact</>}</p>
        <p>Each block&apos;s hash covers the one before it, so changing one block invalidates every block after it. That is the idea behind my chain-of-custody research. These are real SHA-256 hashes computed in your browser.</p>
        <p className="hint">Click a block to tamper with it.</p>
        <button type="button" className="btn sm" onClick={() => setBad(null)} disabled={bad === null}><RotateCcw size={15} /> Restore chain</button>
      </div>
    </div>
  );
}
