import Link from "next/link";
import { Github, Linkedin, Download, Mail, Phone } from "lucide-react";
import { profile, projects } from "@/lib/data";
import { Counter, Reveal } from "@/components/Extras";
import NetCanvas from "@/components/NetCanvas";
import Terminal from "@/components/Terminal";
import Typer from "@/components/Typer";
import Chain from "@/components/Chain";

export default function Home() {
  const featured = projects.filter((p) => p.category === "Cybersecurity").slice(0, 3);
  return (
    <>
      <section className="hero">
        <NetCanvas /><div className="grid-bg" aria-hidden="true" /><div className="scan" aria-hidden="true" />
        <div className="wrap">
          <div>
            <h1>Anup Pund investigates how things break, then builds them to hold.</h1>
            <Typer words={["digital forensics", "deepfake detection", "tamper-evident evidence", "secure software", "software testing"]} />
            <p className="lead">Cybersecurity and digital forensics student at MIT ADT University, Pune. I build security tools, test software, and write about tamper-evident evidence.</p>
            <div className="contact-chips">
              <a href={profile.phoneHref}><Phone size={16} /><span><small>Mobile</small>{profile.phone}</span></a>
              <a href={"mailto:" + profile.email}><Mail size={16} /><span><small>Email</small>{profile.email}</span></a>
              <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
            </div>
            <div className="row">
              <Link className="btn pri" href="/projects">View projects</Link>
              <a className="btn" href={profile.resume} download><Download size={16} /> Download resume</a>
              <Link className="btn" href="/contact">Contact me</Link>
            </div>
          </div>
          <Terminal />
        </div>
      </section>
      <section><div className="wrap">
        <Reveal><div className="sec-h"><h2>Academics</h2></div>
          <div className="stats">
            <div className="stat"><Counter to={8.52} decimals={2} /><span>B.Tech CGPA (out of 10)</span></div>
            <div className="stat"><Counter to={9.25} decimals={2} /><span>Semester 6 SGPA</span></div>
            <div className="stat"><Counter to={79.43} decimals={2} suffix="%" /><span>Diploma, Computer Technology</span></div>
            <div className="stat"><Counter to={3} /><span>Internships completed</span></div>
          </div></Reveal>
      </div></section>
      <section><div className="wrap">
        <Reveal><div className="sec-h"><h2>Security work</h2><p>Forensics and identity projects I have built.</p></div>
          <div className="cards">{featured.map((p) => <Link key={p.slug} href="/projects" className="card"><h3>{p.title}</h3><p>{p.summary}</p><div>{p.stack.slice(0, 4).map((s) => <span className="tag cy" key={s}>{s}</span>)}</div></Link>)}</div></Reveal>
      </div></section>
      <section><div className="wrap">
        <Reveal><div className="sec-h"><h2>Chain of custody, live</h2><p>A small working demo of the idea at the centre of my research.</p></div><Chain /></Reveal>
      </div></section>
    </>
  );
}
