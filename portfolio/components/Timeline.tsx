"use client";
import { useState } from "react";
import { timeline } from "@/lib/data";
export default function Timeline() {
  const [open, setOpen] = useState(timeline.length - 1);
  return (
    <div className="tl">
      {timeline.map((t, i) => (
        <button key={i} type="button" className={open === i ? "on" : ""} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
          <small>{t.when}</small><b>{t.title}</b><span className="tl-d"><span>{t.detail}</span></span>
        </button>
      ))}
    </div>
  );
}
