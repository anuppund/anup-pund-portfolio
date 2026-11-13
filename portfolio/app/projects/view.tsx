"use client";
import { useMemo, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { projects, Project } from "@/lib/data";
import { Modal } from "@/components/Extras";
const cats = ["All", "Cybersecurity", "Web", "Mobile", "Database"];
export default function ProjectsView() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [sel, setSel] = useState<Project | null>(null);
  const list = useMemo(() => projects.filter((p) => (cat === "All" || p.category === cat) && (p.title + p.summary + p.stack.join(" ")).toLowerCase().includes(q.toLowerCase())), [q, cat]);
  return (
    <>
      <div className="tools">
        <input className="search" type="search" placeholder="Search projects or technologies" aria-label="Search projects" value={q} onChange={(e) => setQ(e.target.value)} />
        {cats.map((c) => <button key={c} type="button" className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      {list.length === 0 && <p style={{ color: "var(--muted)" }}>No projects match. Try a different search or filter.</p>}
      <div className="cards">{list.map((p) => (
        <button type="button" className="card" key={p.slug} onClick={() => setSel(p)} aria-haspopup="dialog">
          <span><span className="tag cy">{p.category}</span></span><span className="ct">{p.title}</span><span className="cp">{p.summary}</span>
          <span>{p.stack.slice(0, 4).map((s) => <span className="tag" key={s}>{s}</span>)}</span>
        </button>))}</div>
      {sel && (
        <Modal onClose={() => setSel(null)} title={sel.title} subtitle={sel.summary}>
          <h4>Problem</h4><p style={{ margin: 0, color: "var(--muted)" }}>{sel.problem}</p>
          {sel.role && (<><h4>My role</h4><p style={{ margin: 0, color: "var(--muted)" }}>{sel.role}</p></>)}
          <h4>Key features</h4><ul>{sel.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h4>Technology</h4><div>{sel.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
          <div className="row" style={{ marginTop: 22 }}>
            {sel.github && <a className="btn pri sm" href={sel.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>}
            {sel.live && <a className="btn sm" href={sel.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Live site</a>}
            {sel.note && <span style={{ color: "var(--muted)", fontSize: ".88rem" }}>{sel.note}</span>}
          </div>
        </Modal>)}
    </>
  );
}
