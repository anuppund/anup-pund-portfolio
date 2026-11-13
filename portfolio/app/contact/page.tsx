import type { Metadata } from "next";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import Form from "./form";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <section><div className="wrap"><div className="sec-h"><h2>Get in touch</h2><p>I&apos;m open to entry-level cybersecurity roles and internships. Fill in the form and it opens in Gmail, ready to send, or reach me directly.</p></div>
      <div className="two"><Form />
        <div className="row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
          <a className="btn" href={"mailto:" + profile.email}><Mail size={16} /> {profile.email}</a>
          <a className="btn" href={profile.phoneHref}><Phone size={16} /> {profile.phone}</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a>
          <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>
          <p style={{ color: "var(--muted)", display: "flex", gap: 8, alignItems: "center", margin: 0 }}><MapPin size={16} /> {profile.location}</p>
        </div></div></div></section>
  );
}
