"use client";
import { useEffect, useMemo, useState } from "react";
import { Download, Eye, ExternalLink } from "lucide-react";
import { certificates, pendingCerts, Cert } from "@/lib/data";
import { Modal } from "@/components/Extras";
const cats = ["All", "Cybersecurity", "Programming", "Cloud", "Networking", "Other"];
export default function CertView() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [sel, setSel] = useState<Cert | null>(null); const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(window.matchMedia("(pointer: coarse)").matches); }, []);
  const list = useMemo(() => certificates.filter((c) => (cat === "All" || c.category === cat) && (c.title + c.issuer + c.skills.join(" ")).toLowerCase().includes(q.toLowerCase())), [q, cat]);
  return (
    <>
      <div className="tools">
        <input className="search" type="search" placeholder="Search certificates" aria-label="Search certificates" value={q} onChange={(e) => setQ(e.target.value)} />
        {cats.map((c) => <button key={c} type="button" className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      {list.length === 0 && <p style={{ color: "var(--muted)" }}>No certificates match. Try a different search or category.</p>}
      <div className="cards">{list.map((c) => (
        <div className="card" key={c.id} style={{ cursor: "default" }}>
          <span><span className="tag cy">{c.category}</span></span><h3>{c.title}</h3>
          <p>{c.issuer}</p><p>{c.date}{c.note ? " · " + c.note : ""}</p>
          <div>{c.skills.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
          <div className="row" style={{ marginTop: "auto" }}>
            <button type="button" className="btn pri sm" onClick={() => setSel(c)} aria-haspopup="dialog"><Eye size={15} /> View certificate</button>
            <a className="btn sm" href={c.file} download><Download size={15} /> Download</a>
          </div>
        </div>))}</div>
      <p className="legend" style={{ marginTop: 32 }}>Also on my resume, certificates to be added: {pendingCerts.join(", ")}.</p>
      {sel && (
        <Modal big fit onClose={() => setSel(null)} title={sel.title} subtitle={sel.issuer + " · " + sel.date}>
          {sel.type === "pdf"
            ? (touch
              ? <div className="prev-note"><p>PDF previews don&apos;t scroll reliably inside popups on touch devices. Open the certificate in a new tab to read it.</p></div>
              : <iframe className="prev" src={sel.file + "#view=FitH"} title={sel.title} />)
            : <div className="prev-img"><img src={sel.file} alt={sel.title + " certificate"} /></div>}
          <div className="row"><a className="btn pri sm" href={sel.file} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Open in new tab</a><a className="btn sm" href={sel.file} download><Download size={15} /> Download original</a></div>
        </Modal>)}
    </>
  );
}
