import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import { profile } from "@/lib/data";
export const metadata: Metadata = { title: "About" };
const papers = ["Tamper-Evident Chain of Custody for AI-Based Deepfake Forensics: A Hash-Chained Audit Log with Merkle Commitment and Digitally Sealed Reports", "Deepfake Forensics Tool: AI-Driven Multi-Modal Media Authentication with Forensic Evidence Reporting", "Block Chain Based Single Sign ON SSO"];
export default function About() {
  return (
    <section><div className="wrap">
      <div className="sec-h"><h2>About me</h2></div>
      <div className="about-top">
        <figure className="photo">
          <div className="photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.photo} alt="Portrait of Anup Pund in a grey suit and maroon tie" width={860} height={1022} />
            <span className="ring" aria-hidden="true" /><span className="sweep" aria-hidden="true" />
            <i className="cn tl" /><i className="cn tr" /><i className="cn bl" /><i className="cn br" />
          </div>
          <figcaption><b>{profile.fullName}</b><span>CSE, Cyber Security &amp; Forensics</span></figcaption>
        </figure>
        <div className="prose">
          <p>I&apos;m a B.Tech student in Computer Science Engineering at MIT ADT University, Pune, specializing in Cyber Security and Forensics. I started with a diploma in computer technology at Amrutvahini Polytechnic, Sangamner, and moved into the degree in 2024.</p>
          <p>I&apos;m drawn to the investigative side of security: finding weaknesses, working out what happened, and recording it so others can trust the result. That is why my main project is a deepfake forensics tool and why my research is about evidence that can&apos;t be quietly altered.</p>
          <p>I also build and test software. I&apos;ve interned as a software developer, a cyber security analyst and a software tester, and I&apos;ve shipped websites for real businesses, including a skincare brand I co-founded. I&apos;m looking for an entry-level cybersecurity role where I can keep learning on real problems.</p>
        </div>
      </div>
      <div className="two" style={{ marginTop: 56 }}>
        <div className="prose">
          <h3 style={{ marginBottom: 12 }}>Research papers (IJSREM)</h3>
          <ul style={{ color: "var(--muted)", paddingLeft: 20, margin: 0 }}>{papers.map((p) => <li key={p} style={{ marginBottom: 8 }}>{p}</li>)}</ul>
        </div>
        <div><h3 style={{ marginBottom: 16 }}>Journey</h3><Timeline /></div>
      </div>
    </div></section>
  );
}
