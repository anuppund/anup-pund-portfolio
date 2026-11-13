"use client";
import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { profile } from "@/lib/data";

type Errs = Partial<Record<"name" | "email" | "subject" | "message", string>>;
const MAX = 1500;

/** Builds a Gmail compose link, pre-filled. Opens Gmail in a new tab; the visitor presses Send there. */
export function gmailUrl(d: { name: string; email: string; subject: string; message: string }) {
  const body = `${d.message.trim()}\n\n--\n${d.name.trim()}\nReply to: ${d.email.trim()}`;
  return "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(profile.email) + "&su=" + encodeURIComponent("[Portfolio] " + d.subject.trim()) + "&body=" + encodeURIComponent(body);
}
export function mailtoUrl(d: { name: string; email: string; subject: string; message: string }) {
  return "mailto:" + profile.email + "?subject=" + encodeURIComponent("[Portfolio] " + d.subject.trim()) + "&body=" + encodeURIComponent(`${d.message.trim()}\n\n--\n${d.name.trim()}\nReply to: ${d.email.trim()}`);
}

export default function Form() {
  const [errs, setErrs] = useState<Errs>({}); const [sent, setSent] = useState<{ mailto: string; gmail: string } | null>(null); const [len, setLen] = useState(0);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const x: Errs = {};
    if (!d.name?.trim()) x.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((d.email || "").trim())) x.email = "Enter a valid email address.";
    if (!d.subject?.trim()) x.subject = "Enter a subject.";
    if ((d.message || "").trim().length < 10) x.message = "Write at least 10 characters.";
    setErrs(x); if (Object.keys(x).length) return;
    const v = { name: d.name, email: d.email, subject: d.subject, message: d.message };
    const g = gmailUrl(v);
    // Note: window.open with the "noopener" feature always returns null, so detach the opener manually.
    const w = window.open(g, "_blank");
    if (w) { try { w.opener = null; } catch { /* ignore */ } } else window.location.href = g; // popup blocked: use this tab
    setSent({ gmail: g, mailto: mailtoUrl(v) });
  }
  const F = (k: keyof Errs, label: string, area?: boolean) => (
    <div><label htmlFor={k}>{label}</label>
      {area
        ? <textarea id={k} name={k} rows={6} maxLength={MAX} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? k + "-e" : undefined} onChange={(e) => setLen(e.target.value.length)} />
        : <input id={k} name={k} type={k === "email" ? "email" : "text"} maxLength={200} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? k + "-e" : undefined} autoComplete={k === "name" ? "name" : k === "email" ? "email" : "off"} />}
      {errs[k] && <div className="err" id={k + "-e"} role="alert">{errs[k]}</div>}
    </div>);
  return (
    <form onSubmit={submit} noValidate>
      {F("name", "Your name")}{F("email", "Your email")}{F("subject", "Subject")}{F("message", "Message", true)}
      <div className="count">{len}/{MAX}</div>
      <button className="btn pri" type="submit" style={{ justifySelf: "start" }}><Send size={16} /> Open in Gmail</button>
      <div aria-live="polite">
        {sent && <p className="ok">Gmail is opening in a new tab with your message filled in. Press Send there to deliver it. <span style={{ color: "var(--muted)" }}>Gmail didn&apos;t open? <a className="lnk" href={sent.gmail} target="_blank" rel="noopener noreferrer">Open Gmail</a> or <a className="lnk" href={sent.mailto}>use your default mail app</a>.</span></p>}
      </div>
    </form>
  );
}
