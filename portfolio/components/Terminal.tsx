"use client";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { profile, projects, certificates, skillGroups } from "@/lib/data";

type Line = { k: "in" | "out" | "err" | "ok"; t: string };
const pages: Record<string, string> = { home: "/", about: "/about", projects: "/projects", certifications: "/certifications", certs: "/certifications", skills: "/skills", contact: "/contact" };
const HELP = ["whoami            who I am", "skills            what I work with", "projects          security projects first", "certs             certifications", "contact           how to reach me", "resume            download my resume", "open <page>       about | projects | certs | skills | contact", "clear             clear the screen"];
const chips = ["help", "whoami", "skills", "projects", "contact"];

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([{ k: "in", t: "whoami" }, { k: "out", t: "anup-pund: B.Tech CSE (Cyber Security & Forensics), MIT ADT University" }, { k: "out", t: "Type help, or tap a command below." }]);
  const [val, setVal] = useState(""); const hist = useRef<string[]>([]); const hi = useRef(-1);
  const body = useRef<HTMLDivElement>(null); const inp = useRef<HTMLInputElement>(null);
  useEffect(() => { const b = body.current; if (b) b.scrollTop = b.scrollHeight; }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim(); const [c, ...a] = cmd.split(/\s+/); const arg = a.join(" ").toLowerCase();
    const out: Line[] = [{ k: "in", t: cmd }]; const o = (t: string, k: Line["k"] = "out") => out.push({ k, t });
    switch ((c || "").toLowerCase()) {
      case "": return;
      case "help": HELP.forEach((h) => o(h)); break;
      case "whoami": o("Anup Sudarshan Pund. Cybersecurity and digital forensics student, Pune."); o("Focus: deepfake forensics, tamper-evident evidence, secure software."); break;
      case "ls": case "projects": projects.filter((p) => p.category === "Cybersecurity").forEach((p) => o("[sec] " + p.title)); projects.filter((p) => p.category !== "Cybersecurity").forEach((p) => o("[" + p.category.toLowerCase() + "] " + p.title)); o("Run: open projects", "ok"); break;
      case "skills": skillGroups.slice(0, 3).forEach((g) => o(g.name.padEnd(14) + g.items.map((i) => i[0]).join(", "))); o("Run: open skills for the rest", "ok"); break;
      case "certs": certificates.forEach((x) => o("• " + x.title + " (" + x.issuer.split(",")[0] + ")")); o("Run: open certs", "ok"); break;
      case "contact": o("mail   " + profile.email); o("phone  " + profile.phone); o("Run: open contact to send a message", "ok"); break;
      case "resume": o("Downloading resume…", "ok"); { const l = document.createElement("a"); l.href = profile.resume; l.download = ""; document.body.appendChild(l); l.click(); l.remove(); } break;
      case "open": case "cd": if (pages[arg]) { o("Opening " + arg + "…", "ok"); setTimeout(() => router.push(pages[arg]), 250); } else o("Usage: open about | projects | certs | skills | contact", "err"); break;
      case "clear": setLines([]); return;
      case "sudo": if (arg.includes("hire")) { o("[sudo] permission granted. Opening contact…", "ok"); setTimeout(() => router.push("/contact"), 500); } else o("Nice try. This account is least-privilege.", "err"); break;
      default: o("command not found: " + c + ". Type help.", "err");
    }
    setLines((l) => [...l, ...out].slice(-60));
  }
  const submit = (e: React.FormEvent) => { e.preventDefault(); hist.current.unshift(val); hi.current = -1; run(val); setVal(""); };
  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && hist.current.length) { e.preventDefault(); hi.current = Math.min(hi.current + 1, hist.current.length - 1); setVal(hist.current[hi.current]); }
    if (e.key === "ArrowDown") { e.preventDefault(); hi.current = Math.max(hi.current - 1, -1); setVal(hi.current < 0 ? "" : hist.current[hi.current]); }
  };
  return (
    <div className="term" role="region" aria-label="Interactive terminal">
      <div className="term-bar"><i /><i /><i /><span>anup@portfolio: ~</span></div>
      <div className="term-body" ref={body} onClick={() => inp.current?.focus({ preventScroll: true })} aria-live="polite">
        {lines.map((l, i) => <div key={i} className={"tl-" + l.k}>{l.k === "in" ? <><span className="pr">$</span> {l.t}</> : l.t}</div>)}
        <form onSubmit={submit} className="term-in"><span className="pr">$</span><input ref={inp} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={key} aria-label="Terminal command" autoComplete="off" autoCapitalize="off" spellCheck={false} maxLength={60} /></form>
      </div>
      <div className="term-chips">{chips.map((c) => <button key={c} type="button" onClick={() => run(c)}>{c}</button>)}</div>
    </div>
  );
}
