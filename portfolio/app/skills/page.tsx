import type { Metadata } from "next";
import { Shield, Code2, Server, Database, Layout, Wrench } from "lucide-react";
import { skillGroups } from "@/lib/data";
import { Reveal } from "@/components/Extras";
export const metadata: Metadata = { title: "Skills" };
const icons = [Shield, Code2, Server, Database, Layout, Wrench];
export default function Skills() {
  return (
    <section><div className="wrap">
      <div className="sec-h"><h2>Skills</h2></div>
      <p className="legend"><span className="skill" style={{ margin: "0 8px 0 0" }}><i className="dot" /> Used in projects or internships</span><span className="skill"><i className="dot l" /> Learning through coursework and certifications</span></p>
      <div className="cards">{skillGroups.map((g, i) => {
        const I = icons[i]; const used = g.items.filter((x) => x[1] === "p").length;
        return (
          <Reveal key={g.name}><div className="card" style={{ cursor: "default" }}>
            <h3 style={{ display: "flex", gap: 10, alignItems: "center" }}><I size={20} color="#37d6ff" />{g.name}</h3>
            <div className="meter" role="img" aria-label={`${used} of ${g.items.length} used in projects`}>{g.items.map(([n, l]) => <i key={n} className={l === "l" ? "l" : "p"} />)}</div>
            <div>{g.items.map(([n, l]) => <span className="skill" key={n}><i className={"dot" + (l === "l" ? " l" : "")} />{n}</span>)}</div>
          </div></Reveal>); })}</div>
    </div></section>
  );
}
